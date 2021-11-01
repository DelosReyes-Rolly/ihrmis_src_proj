<?php

namespace App\Http\Controllers;

use App\Http\Resources\Applicant\ApplicantEducationalResource;
use App\Models\Applicants\TblapplicantEducations;
use App\Models\Second\SecApplicantEducation;
use Illuminate\Http\Request;

class TblapplicantEducationsController extends Controller
{
    public function getEducationRecord($id)
    {   
        $education = SecApplicantEducation::where('edu_app_id', $id)->get();
        return ApplicantEducationalResource::collection($education);
    }
    
    public function addEducationRecord($id, Request $request)
    {
        $request->validate([
            'edu_app_level' => 'required',
            'edu_app_school' => 'required',
            'edu_app_from' => 'required',
            'edu_app_to' => 'required',
            'edu_app_degree' => 'required',
            'edu_app_graduated' => 'required',
            'edu_app_units' => 'required',
            'edu_app_honors' => 'required',
        ]);

        if(isset($request->item)){
            $updateEducation = SecApplicantEducation::where('edu_app_idref',$request->item)->update([
                'edu_app_idref' => $request->item,
                'edu_app_id' => $id,
                'edu_app_level' => $request->edu_app_level,
                'edu_app_school' => $request->edu_app_school,
                'edu_app_from' => $request->edu_app_from,
                'edu_app_to' => $request->edu_app_to,
                'edu_app_degree' => $request->edu_app_degree,
                'edu_app_graduated' => $request->edu_app_graduated,
                'edu_app_units' => $request->edu_app_units,
                'edu_app_honors' => $request->edu_app_honors,
            ]);
        } else {
            $education = new SecApplicantEducation();
            $education->edu_app_id = $id;
            $education->edu_app_level = $request->edu_app_level;
            $education->edu_app_school = $request->edu_app_school;
            $education->edu_app_from = $request->edu_app_from;
            $education->edu_app_to = $request->edu_app_to;
            $education->edu_app_degree = $request->edu_app_degree;
            $education->edu_app_graduated = $request->edu_app_graduated;
            $education->edu_app_units = $request->edu_app_units;
            $education->edu_app_honors = $request->edu_app_honors;
            $education->save();
        }
        

        return response()->json([
            'item' => $id,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function update($id)
    {
        return response()->json([
            'status' => 200,
            'message' => "Updated Successfully",
        ]);
    }

    public function removeEducationRecord($id)
    {
        
        SecApplicantEducation::where('edu_app_idref', $id)->delete();
        
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}


