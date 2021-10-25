<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantExperiences;
use Illuminate\Http\Request;

class TblapplicantExperiencesController extends Controller
{
    public function index($id)
    {
        return TblapplicantExperiences::where('exp_app_id', $id)->get();
    }
    
    public function store($id, Request $request)
    {
        $experience = new TblapplicantExperiences();
        $experience->exp_app_id = $id;
        $experience->exp_app_from = $request->exp_app_from;
        $experience->exp_app_to = $request->exp_app_to;
        $experience->exp_app_position = $request->exp_app_position;
        $experience->exp_app_agency = $request->exp_app_agency;
        $experience->exp_app_salary = $request->exp_app_salary;
        $experience->exp_app_grade = $request->exp_app_grade;
        $experience->exp_app_step = $request->exp_app_step;
        $experience->exp_app_appntmnt = $request->exp_app_appntmnt;
        $experience->exp_app_govt = $request->exp_app_govt;
        $experience->exp_app_rel_fields = $request->exp_app_rel_fields;
        $experience->save();

        return response()->json([
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

    public function destroy($id)
    {
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
