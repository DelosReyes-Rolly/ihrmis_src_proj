<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantExperienceResource;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantExperiences;
use Illuminate\Http\Request;

class TblapplicantExperiencesController extends Controller
{
    public function getExperienceRecord($id)
    {
        $work = TblapplicantExperiences::where('exp_app_id', $id)->get();

        return CommonResource::collection($work);
    }

    public function addExperienceRecord($expId = null, Request $request)
    {

        $request->validate([
            'exp_app_from' => 'required|date_format:Y-m-d|before:today',
            'exp_app_to' => 'required|date_format:Y-m-d|after:' . $request->exp_app_from,
            'exp_app_position' => 'required|regex:/^[\pL\s\-]+$/u',
            'exp_app_agency' => 'required',
            'exp_app_salary' => 'required|numeric',
            'exp_app_rel_fields' => 'required',
            // 'exp_app_grade' => 'required',
            // 'exp_app_step' => 'required',
            // 'exp_app_appntmnt' => 'required',
            // 'exp_app_govt' => 'required' ,
        ]);

        if ($expId != null) {
            $work = TblapplicantExperiences::where("exp_id", $expId)->first();
            $work->exp_app_id = $request->exp_app_id;
            $work->exp_app_from = $request->exp_app_from;
            $work->exp_app_to = $request->exp_app_to;
            $work->exp_app_position = $request->exp_app_position;
            $work->exp_app_agency = $request->exp_app_agency;
            $work->exp_app_grade = $request->exp_app_grade;
            $work->exp_app_step = $request->exp_app_step;
            $work->exp_app_salary = $request->exp_app_salary;
            $work->exp_app_appntmnt = $request->exp_app_appntmnt;
            $work->exp_app_govt = $request->exp_app_govt;
            $work->exp_app_rel_fields = $request->exp_app_rel_fields;
            $work->save();

            return response()->json([
                'status' => 200,
                'message' => "Updated Successfully",
            ]);
        }

        $work = new TblapplicantExperiences();
        $work->exp_app_id = $request->exp_app_id;
        $work->exp_app_from = $request->exp_app_from;
        $work->exp_app_to = $request->exp_app_to;
        $work->exp_app_position = $request->exp_app_position;
        $work->exp_app_agency = $request->exp_app_agency;
        $work->exp_app_grade = $request->exp_app_grade;
        $work->exp_app_step = $request->exp_app_step;
        $work->exp_app_salary = $request->exp_app_salary;
        $work->exp_app_appntmnt = $request->exp_app_appntmnt;
        $work->exp_app_govt = $request->exp_app_govt;
        $work->exp_app_rel_fields = $request->exp_app_rel_fields;
        $work->save();

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function removeExperienceRecord($id)
    {
        TblapplicantExperiences::where('exp_id', $id)->delete();

        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
