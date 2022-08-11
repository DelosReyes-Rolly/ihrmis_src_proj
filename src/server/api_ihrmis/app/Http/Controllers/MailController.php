<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Mail\AccountRequestVeification;
use App\Mail\CommonMail;
use App\Mail\NotifyNextInRankMail;
use App\Mail\NotifyVacantPlantillaEmail;
use App\Models\AccountRequestModel;
use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsStatus;
use App\Models\ExamScoreModel;
use App\Models\TblemailTemplate;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use App\Models\TblTransactionStages;
use App\Services\CommonHelpers;
use Carbon\Carbon;
use Exception;
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

    public function addEmail(Request $request)
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

    public function verifyAccount($id)
    {
        $query = AccountRequestModel::where('acc_req_id', $id)->first();
        $message = '<p>Dear ' . $query->acc_req_title_id . ' ' . $query->acc_req_first_name . ' ' . $query->acc_req_last_name . '</p>';
        $message .= '<br><p>Please confirm your email address to complete your request. Your verification code is ' . $query->acc_req_code . '</p>';
        $message .= '<br><p>If you are having trouble verifying your email account, you may reply to this email and make sure to describe things
            exactly as they appear on your screen and/or attach a screenshot of the page where you see an error message or encounter another problem.
            <br><br> 
            ' . env("MAIL_FROM_RECRUITER") . '<br>
            <i>Department of Science and Technology</i>
            <p style="font-size:small;">Gen. Santos Avenue, Bicutan, Taguig City</p>
            <br><br> 
            <br>
            DISCLAIMER: If you have received this email by mistake and didn\'t initiate such request, please disregard and delete this email immediately;
            do not use it for any purpose, nor disclose its contents to anyone. This email (including any attachment/s) is confidential  and/or may 
            also be legally priviledged. The sender cannot guarantee that email transmissions are secure or error-free as information may be corrupted,
            arrive late, incomplete, or contain viruses, and therefore does not accept any liability for any errors or omissions in the context of the message.
        </p>';
        $data = [
            "from" => env("MAIL_FROM_RECUITER"),
            "email_from" => env("MAIL_FROM_ADDRESS"),
            "email_to" => $query->acc_req_email,
            "date" => Carbon::now(),
            "message_type" => 'Email verification for Account Request',
            "message" => $message,
            "sender" => env("MAIL_FROM_ADDRESS"),
        ];
        Mail::to($query->acc_req_email)->send(new AccountRequestVeification($data));
    }

    public function verifiedAccount($id)
    {
        $query = AccountRequestModel::with('TblPositions', 'TblOffice')->where('acc_req_id', $id)->first();
        $parentOffice = '';

        if ($query->acc_req_verified === 1) {
            $office = [];
            if ($query->TblOffice->ofc_ofc_id !== null) {
                $office = Tbloffices::where('ofc_id', $query->TblOffice->ofc_ofc_id)->first();
                $parentOffice = $office->ofc_acronym;
            }
        }
        $message = '<p>Good day!</p><br>
        New user access account request has been submitted, please see details below:
        <br><br>
        <b>Profile Details</b><br><br>';
        $message .= '<table style="width:50%">
            <tr>
                <td>Name</td>
                <td>' . $query->acc_req_title_id . ' ' . $query->acc_req_first_name . ' ' . $query->acc_req_last_name . '</td>
            </tr>
            <tr>
                <td>Position/Designation</td>
                <td>' . $query->TblPositions->pos_title . '</td>
            </tr>
            <tr>
                <td>Office/Location</td>
                <td>' . $query->TblOffice->ofc_name . ',  ' . $parentOffice . '</td>
            </tr>
            <tr>
                <td>Email Address</td>
                <td>' . $query->acc_req_email . '</td>
            </tr>
            <tr>
                <td>Phone Number</td>
                <td>' . $query->acc_req_telephone . '</td>
            </tr>
            <tr>
                <td>Mobile Number</td>
                <td>' . $query->acc_req_mobile . '</td>
            </tr>
        </table>
            <br><br> 
            <br>
            DISCLAIMER: If you have received this email by mistake and didn\'t initiate such request, please disregard and delete this email immediately;
            do not use it for any purpose, nor disclose its contents to anyone. This email (including any attachment/s) is confidential  and/or may 
            also be legally priviledged. The sender cannot guarantee that email transmissions are secure or error-free as information may be corrupted,
            arrive late, incomplete, or contain viruses, and therefore does not accept any liability for any errors or omissions in the context of the message.
        </p>';

        $data = [
            "from" => env("MAIL_FROM_RECUITER"),
            "email_from" => env("MAIL_FROM_ADDRESS"),
            "email_to" => env("MAIL_FROM_ADDRESS"),
            "date" => Carbon::now(),
            "message_type" => 'Account Request for iHRMIS',
            "message" => $message,
            "sender" => env("MAIL_FROM_ADDRESS"),
        ];
        Mail::to(env("MAIL_FROM_ADDRESS"))->send(new AccountRequestVeification($data));
    }

    public function notifyVacantPlantillaEmail(Request $request)
    {

        $message = "";
        $arrFiles = [];
        try {

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

            if (count(Mail::failures()) > 0) {

                $message = "EMail was not sent" . implode(", ", Mail::failures()[0]);
            } else {

                $message = "EMail Sent to" . implode(", ", $arrHolder);
                $this->updatePlantillaItemIsNotify($request->itm_id);
            }
        } catch (Exception $e) {
            $message = "Error: " . $e->getMessage();
        }

        return response()->json(["message" => $message]);
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
        $applicantIDs = [];
        foreach (json_decode($request->appID) as $value) {
            array_push($applicantIDs, $value->id);
        }
        if (is_string($request->eml_id)) {
            $this->addEmailTemplate($request);
        } else {
            return $request;
        }
        $arrFiles = [];

        if (!empty($request->file(['image_upload']))) {
            foreach ($request->file(['image_upload']) as $value) {
                array_push($arrFiles, $value);
            }
        }
        

        $rawRecepient = explode(",", $request->recepient);
        $arrHolder = [];
        $stageId = 0;
        if ($request->eml_type == 'PEE') $stageId = $this->getStageId(5);
        if ($request->eml_type == 'INT') $stageId = $this->getStageId(9);
        if ($request->eml_type == 'ASS') $stageId = $this->getStageId(7);
        if ($request->eml_type == 'PSY') $stageId = $this->getStageId(11);
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
                $this->recruitmentSendMail($tempEmail, $request->eml_name, $message, nl2br($request->sender), $arrFiles);
            }
        }
        if ($request->eml_type == 'BCK') {
            foreach (json_decode($request->appID) as $value) {
                $query = Tblapplicants::with('tblReference', 'tblPositions')->where('app_id', $value->id)->first();
                $pos_title = '';
                if (isset($query->tblPositions->pos_title)) {
                    $pos_title = $query->tblPositions->pos_title;
                }
                if (isset($query->tblReference)) {
                    $references = $query->tblReference;

                    foreach ($references as $reference) {
                        $message = $request->eml_message;
                        $message .= '<br><br>
                        <a href="' . env("FRONTEND_PAGE_URL") . 'background-check/' . $reference->ref_id . '/' . $value->id . '" 
                        style="width:100%;text-align:center">Background Check Form</a>
                        ';
                        $replaced_position = str_ireplace("[position-title]", $pos_title, $message);
                        $replaced_reference = str_ireplace("[reference-name]", $reference->ref_app_name, $replaced_position);
                        $tempEmail = trim($reference->ref_app_email, "");
                        if (!in_array($tempEmail, $arrHolder)) {
                            array_push($arrHolder, $tempEmail);
                            $this->recruitmentSendMail($tempEmail, $request->eml_name, $replaced_reference, nl2br($request->sender), $arrFiles);
                        }
                    }
                }
                $test = [];
            }
        }
        if ($request->eml_type != 'PER' && $request->eml_type != 'BCK') {
            foreach ($rawRecepient as $value) {
                $tempEmail = trim($value, " ");
                array_push($arrHolder, $tempEmail);
                
                $this->recruitmentSendMail($tempEmail, $request->eml_name, $request->eml_message, nl2br($request->sender), $arrFiles);
            }

            foreach ($applicantIDs as $applicantID) {
                $this->updateApplicantStatus($applicantID, $stageId);
            }
        }

        return response()->json(["message" => "Mail Sent to" . implode(", ", $arrHolder)]);
    }
    /**
     * Email function to reduce usage of the email code
     *
     * @param [string] $recipient
     * @param [string] $message_type
     * @param [string] $message
     * @param [string] $sender
     * @param [array] $file
     * @return void
     */
    function recruitmentSendMail($recipient, $message_type, $message, $sender, $file)
    {
        $data = [
            "from" => env("MAIL_FROM_RECUITER"),
            "email_from" => env("MAIL_FROM_ADDRESS"),
            "email_to" => $recipient,
            "date" => Carbon::now(),
            "message_type" => $message_type,
            "message" => $message,
            "sender" => nl2br($sender),
            "file" => $file
        ];
        Mail::to($recipient)->send(new CommonMail($data));
    }

    public function getStageId($order)
    {
        return TblTransactionStages::where('stg_order', $order)->first()->stg_id;
    }

    public function updateApplicantStatus($applicant, $status)
    {
        $query = new TblapplicantsStatus();
        $query->sts_app_stg_id = $status;
        $query->sts_app_id  = $applicant;
        $query->save();
    }

    /**
     * updateEmployeeProfile
     * Todo update employee profile
     * @return void
     */
    private function updatePlantillaItemIsNotify($itm_no)
    {
        $plantillaitem = TblplantillaItems::find($itm_no);
        $plantillaitem->is_notify = true;

        return $plantillaitem->save();
    }
}
