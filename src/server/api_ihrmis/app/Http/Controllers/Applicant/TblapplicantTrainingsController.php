<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantTrainingResource;
use App\Models\Applicants\TblapplicantTrainings;
use Illuminate\Http\Request;

class TblapplicantTrainingsController extends Controller
{
    public function getTrainingRecord($id)
    {   
        $training = TblapplicantTrainings::where('trn_app_id', $id)->get();  
        return  ApplicantTrainingResource::collection($training);
    }
    
    public function addTrainingRecord($id, Request $request)
    {
        $request->validate([
            "trn_app_title" => 'required',
            "trn_app_from" => 'required|date_format:Y-m-d|before:today',
            "trn_app_to" => 'required|date_format:Y-m-d|after:'.$request->trn_app_from,
            "trn_app_type" => 'required',
            "trn_app_hours" => 'required|numeric',
            "trn_app_sponsor" => 'required',
            "trn_app_cmptncy" => 'required',
        ],[
            "required" => "This field is required",
            "regex" => "Invalid input",
            "before" => "Invalid input",
            "after" => "Invalid input",
            "date_format" => "Invalid input"
        ]);

        if(isset($request->item)){
            TblapplicantTrainings::where('trn_app_time', $request->item)->update([
                "trn_app_id" => $id,
                "trn_app_time" => $request->item,
                "trn_app_title" => $request->trn_app_title,
                "trn_app_from" => $request->trn_app_from,
                "trn_app_to" => $request->trn_app_to,
                "trn_app_hours" => $request->trn_app_hours,
                "trn_app_type" => $request->trn_app_type ?? 'PE',
                "trn_app_sponsor" => $request->trn_app_sponsor,
                "trn_app_cmptncy" => $request->trn_app_cmptncy,
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Updated Successfully",
            ]);
        }
        
        $training = new TblapplicantTrainings();
        $training->trn_app_id = $id;
        $training->trn_app_title = $request->trn_app_title;
        $training->trn_app_from = $request->trn_app_from;
        $training->trn_app_to = $request->trn_app_to;
        $training->trn_app_hours = $request->trn_app_hours;
        $training->trn_app_type = $request->trn_app_type ?? 'PE';
        $training->trn_app_sponsor = $request->trn_app_sponsor;
        $training->trn_app_cmptncy = $request->trn_app_cmptncy;
        $training->save();

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function removeTrainingRecord($id)
    {
        TblapplicantTrainings::where('trn_app_time', $id)->delete();

        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
