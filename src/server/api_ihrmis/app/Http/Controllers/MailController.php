<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Mail\CommonMail;
use App\Mail\NotifyNextInRankMail;
use App\Mail\NotifyVacantPlantillaEmail;
use App\Models\ExamScoreModel;
use App\Models\TblemailTemplate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function getEmailTemplate($type = null)
    {
        if ($type != null) {
            $mailQry = TblemailTemplate::where('eml_type', $type)->get();
            return CommonResource::collection($mailQry);
        }
        $mailQry = TblemailTemplate::get();
        return CommonResource::collection($mailQry);
    }

    public function addEmailTemplate($request)
    {
        $mailQry = TblemailTemplate::firstOrNew(['eml_id' => $request->eml_id]);
        $mailQry->eml_type = $request->eml_type;
        $mailQry->eml_name = $request->eml_name;
        $mailQry->eml_message = $request->eml_message;
        if ($request->eml_link != null) {
            $mailQry->eml_link = $request->eml_link;
        }
        $mailQry->save();
    }

    public function deleteEmailTemplate($id)
    {
        TblemailTemplate::where('eml_id', $id)->delete();
        return response()->json([
            "status" => "200",
            "message" => "Successfully deleted an Email Template"
        ]);
    }

    public function removeMailType()
    {
        // $mailQry = TblemailType::all();
        // return CommonResource::collection($mailQry);
    }


    public function notifyVacantPlantillaEmail(Request $request)
    {

        $arrFiles = [];

        if (!empty($request->file(['image_upload']))) {
            foreach ($request->file(['image_upload']) as $value) {
                array_push($arrFiles, $value);
            }
        }

        // Getting all the email where to send to
        $rawRecepient = explode(",", $request->recepient);

        $arrHolder = [];
        foreach ($rawRecepient as $value) {
            $tempEmail = trim($value, " ");
            array_push($arrHolder, $tempEmail);
            $data = [
                "from" => env("MAIL_FROM_RECRUITER"),
                "email_from" => env("MAIL_FROM_ADDRESS"),
                "email_to" => $tempEmail,
                "date" => Carbon::now(),
                "message_type" => $request->message_type,
                "message" => $request->message,
                "sender" => nl2br($request->sender),
                "file" => $arrFiles
            ];
            Mail::to($tempEmail)->send(new NotifyVacantPlantillaEmail($data));
        }

        return response()->json(["message" => "Mail Sent to" . implode(", ", $arrHolder)]);
    }

    public function notifyNextRank(Request $request)
    {
        $arrFiles = [];

        if (!empty($request->file(['image_upload']))) {
            foreach ($request->file(['image_upload']) as $value) {
                array_push($arrFiles, $value);
            }
        }

        $rawRecepient = explode(",", $request->recepient);
        $startDate = Carbon::now()->timezone('Asia/Manila');
        $endDate = Carbon::parse($request->deadline)->timezone('Asia/Manila');
        $deadline =  $startDate->diffInDays($endDate);
        $arrHolder = [];

        foreach ($rawRecepient as $value) {
            $tempEmail = trim($value, " ");
            array_push($arrHolder, $tempEmail);
            $data = [
                "from" => env("MAIL_FROM_RECUITER"),
                "email_from" => env("MAIL_FROM_ADDRESS"),
                "email_to" => $tempEmail,
                "date" => Carbon::now(),
                "message_type" => $request->message_type,
                "message" => $request->message,
                "deadline" => $deadline,
                "sender" => nl2br($request->sender),
                "file" => $arrFiles
            ];
            Mail::to($tempEmail)->send(new NotifyNextInRankMail($data));
        }

        return response()->json(["message" => "Mail Sent to" . implode(", ", $arrHolder)]);
    }

    public function recruitmentEmail(Request $request)
    {
        // if (is_string($request->eml_id)) {
        //     $this->addEmailTemplate($request);
        // } else {
        //     return $request;
        // }
        $arrFiles = [];

        if (!empty($request->file(['image_upload']))) {
            foreach ($request->file(['image_upload']) as $value) {
                array_push($arrFiles, $value);
            }
        }

        $rawRecepient = explode(",", $request->recepient);
        $arrHolder = [];

        if ($request->eml_type == 'PER') {
            foreach (json_decode($request->appID) as $value) {
                $message = $request->eml_message;

                $query = ExamScoreModel::with('BatteryData')->where('exam_app_id', $value->id)->get();
                $message .= '
                <table style="border:solid 1px black">';
                foreach ($query as $bat) {
                    $message .= '
                    <tr>
                    <td>' . $bat->BatteryData->bat_name . '</td>
                    <td>' . $bat->exam_score . '</td>
                    </tr>';
                }

                $message .= '</table>';

                $tempEmail = trim($value->email, " ");
                array_push($arrHolder, $tempEmail);
                $data = [
                    "from" => env("MAIL_FROM_RECUITER"),
                    "email_from" => env("MAIL_FROM_ADDRESS"),
                    "email_to" => $value->email,
                    "date" => Carbon::now(),
                    "message_type" => $request->eml_name,
                    "message" => $message,
                    "sender" => nl2br($request->sender),
                    "file" => $arrFiles
                ];
                Mail::to($value->email)->send(new CommonMail($data));
            }
        }
        if ($request->eml_type != 'PER') {
            foreach ($rawRecepient as $value) {
                $tempEmail = trim($value, " ");
                array_push($arrHolder, $tempEmail);
                $data = [
                    "from" => env("MAIL_FROM_RECUITER"),
                    "email_from" => env("MAIL_FROM_ADDRESS"),
                    "email_to" => $tempEmail,
                    "date" => Carbon::now(),
                    "message_type" => $request->eml_name,
                    "message" => $request->eml_message,
                    "sender" => nl2br($request->sender),
                    "file" => $arrFiles
                ];
                Mail::to($tempEmail)->send(new CommonMail($data));
            }
        }


        return response()->json(["message" => "Mail Sent to" . implode(", ", $arrHolder)]);
    }
}
