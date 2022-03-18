<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Email\GetEmailTypeResource;
use App\Mail\NotifyVacantPlantillaEmail;
use App\Models\TblemailType;
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
        foreach ($request['image_upload'] as $value) {
            array_push($arrFiles, $value);
        }
        
        // Getting all the email where to send to
        $rawRecepient = explode(",", $request->recepient);

        $arrHolder = [];
        foreach ($rawRecepient as $value) {
            array_push($arrHolder, trim($value, " "));
            $data = [
                "email_to" => trim($value, " "),
                "message_type" => $request->message_type,
                "message" => $request->message,
                "sender" => $request->sender,
                "file" => $arrFiles
            ];
            Mail::to(trim($value," "))->send(new NotifyVacantPlantillaEmail($data));
        }
       
        return response()->json(["message" => "Mail Sent to" . implode(", ",$arrHolder)]);
    }
}
