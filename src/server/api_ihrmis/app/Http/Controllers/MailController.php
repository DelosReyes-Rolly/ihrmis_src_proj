<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Email\GetEmailTypeResource;
use App\Mail\NotifyVacantPlantillaEmail;
use App\Models\TblemailType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function getMailType()
    {
        $mailQry = TblemailType::all();
        return GetEmailTypeResource::collection($mailQry);
    }

    public function addMailType()
    {
        $mailQry = TblemailType::all();
        return CommonResource::collection($mailQry);
    }

    public function removeMailType()
    {
        $mailQry = TblemailType::all();
        return CommonResource::collection($mailQry);
    }
    
    public function notifyVacantPlantillaEmail(Request $request)
    {
        
        $arrFiles=[];

        if(empty($request->file(['image_upload']))){
            foreach ($request->file(['image_upload']) as $value) {
                array_push($arrFiles, $value);
            }    
        }

        // Getting all the email where to send to
        $rawRecepient = explode(",", $request->recepient);

        $arrHolder = [];
        foreach ($rawRecepient as $value) {
            array_push($arrHolder, trim($value, " "));
            $data = [
                "from" => env("MAIL_FROM_RECUITER"),
                "email_from" => env("MAIL_FROM_ADDRESS"),
                "email_to" => trim($value, " "),
                "date" => Carbon::now(),
                "message_type" => $request->message_type,
                "message" => $request->message,
                "sender" => nl2br($request->sender),
                "file" => $arrFiles
            ];
            Mail::to(trim($value," "))->send(new NotifyVacantPlantillaEmail($data));
        }
       
        return response()->json(["message" => "Mail Sent to" . implode(", ",$arrHolder)]);
    }
}
