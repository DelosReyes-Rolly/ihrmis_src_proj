<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantEducationalResource;
use App\Models\Applicants\TblapplicantEducations;
use App\Models\Second\SecApplicantEducation;
use Illuminate\Http\Request;

class TblapplicantEducationsController extends Controller
{
    public function getEducationRecord($id)
    {   
        $education = TblapplicantEducations::where('edu_app_id', $id)->get();
        return ApplicantEducationalResource::collection($education);
    }
    
    public function addEducationRecord($id, Request $request)
    {
        $request->validate([
            // 'edu_app_level' => 'required',
            'edu_app_school' => 'required',
            'edu_app_from' => 'required|date_format:Y|before:'.$request->edu_app_to,
            'edu_app_to' => 'required|date_format:Y|after:'.$request->edu_app_from,
            'edu_app_degree' => 'required|regex:/^[\pL\s\-]+$/u',
            'edu_app_graduated' => 'required',
            'edu_app_units' => 'required|numeric',
            'edu_app_honors' => 'required',
        ],[
            "required" => "This field is required",
            "regex" => "Invalid input",
            "before" => "Invalid input",
            "after" => "Invalid input",
            "date_format" => "Invalid input"
        ]);

        if(isset($request->item)){
            TblapplicantEducations::where('edu_app_idref',$request->item)->update([
                'edu_app_idref' => $request->item,
                'edu_app_id' => $id,
                'edu_app_level' => $request->edu_app_level ?? 0,
                'edu_app_school' => $request->edu_app_school,
                'edu_app_from' => $request->edu_app_from,
                'edu_app_to' => $request->edu_app_to,
                'edu_app_degree' => $request->edu_app_degree,
                'edu_app_graduated' => $request->edu_app_graduated,
                'edu_app_units' => $request->edu_app_units,
                'edu_app_honors' => $request->edu_app_honors,
            ]);

            return response()->json([
                'item' => $id,
                'status' => 200,
                'message' => "Updated Successfully",
            ]);
        } 

        $education = new TblapplicantEducations();
        $education->edu_app_id = $id;
        $education->edu_app_level = $request->edu_app_level ?? 0;
        $education->edu_app_school = $request->edu_app_school;
        $education->edu_app_from = $request->edu_app_from;
        $education->edu_app_to = $request->edu_app_to;
        $education->edu_app_degree = $request->edu_app_degree;
        $education->edu_app_graduated = $request->edu_app_graduated;
        $education->edu_app_units = $request->edu_app_units;
        $education->edu_app_honors = $request->edu_app_honors;
        $education->save();
        
        return response()->json([
            'item' => $id,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function removeEducationRecord($id)
    {
        
        TblapplicantEducations::where('edu_app_idref', $id)->delete();
        
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
