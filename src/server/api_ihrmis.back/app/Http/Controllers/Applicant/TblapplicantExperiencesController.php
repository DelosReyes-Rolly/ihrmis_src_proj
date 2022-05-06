<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantExperienceResource;
use App\Models\Applicants\TblapplicantExperiences;
use Illuminate\Http\Request;

class TblapplicantExperiencesController extends Controller
{
    public function getExperienceRecord($id)
    {
        $work = TblapplicantExperiences::where('exp_app_id', $id)->get();
        
        return ApplicantExperienceResource::collection($work);
    }
    
    public function addExperienceRecord($id, Request $request)
    {
        
        $request->validate([
            'exp_app_from' => 'required|date_format:Y-m-d|before:today',
            'exp_app_to' => 'required|date_format:Y-m-d|after:'.$request->exp_app_from,
            'exp_app_position' => 'required|regex:/^[\pL\s\-]+$/u',
            'exp_app_agency' => 'required',
            'exp_app_salary' => 'required|numeric',
            'exp_app_rel_fields' => 'required',
            // 'exp_app_grade' => 'required',
            // 'exp_app_step' => 'required',
            // 'exp_app_appntmnt' => 'required',
            // 'exp_app_govt' => 'required' ,
        ]);
        
        if(isset($request->item)){
            TblapplicantExperiences::where('exp_app_time',$request->item)->update([
                'exp_app_time' => $request->item,
                'exp_app_id' => $id,
                'exp_app_from' => $request->exp_app_from,
                'exp_app_to' => $request->exp_app_to,
                'exp_app_position' => $request->exp_app_position,
                'exp_app_agency' => $request->exp_app_agency,
                'exp_app_salary' => $request->exp_app_salary,
                'exp_app_grade' => $request->exp_app_grade ?? 1,
                'exp_app_step' => $request->exp_app_step ?? 1,
                'exp_app_appntmnt' => $request->exp_app_appntmnt ?? 1,
                'exp_app_govt' => $request->exp_app_govt ?? 0,
                'exp_app_rel_fields' => $request->exp_app_rel_fields,
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Updated Successfully",
            ]);
        } 

        $experience = new TblapplicantExperiences();
        $experience->exp_app_id = $id;
        $experience->exp_app_from = $request->exp_app_from;
        $experience->exp_app_to = $request->exp_app_to;
        $experience->exp_app_position = $request->exp_app_position;
        $experience->exp_app_agency = $request->exp_app_agency;
        $experience->exp_app_salary = $request->exp_app_salary;
        $experience->exp_app_grade = $request->exp_app_grade ?? 1;
        $experience->exp_app_step = $request->exp_app_step ?? 1;
        $experience->exp_app_appntmnt = $request->exp_app_appntmnt ?? 1;
        $experience->exp_app_govt = $request->exp_app_govt ?? 0;
        $experience->exp_app_rel_fields = $request->exp_app_rel_fields;
        $experience->save();
        
        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function removeExperienceRecord($id)
    {
        TblapplicantExperiences::where('exp_app_time', $id)->delete();
        
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
