<?php

namespace App\Http\Controllers\Applicant;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantEducations;
use Illuminate\Http\Request;

class TblapplicantEducationsController extends Controller
{
    public function getEducationRecord($id) {
        $education = TblapplicantEducations::where('edu_app_id', $id)->get();
        return CommonResource::collection($education);
    }

    public function addEducationRecord($id = null, Request $request) {
        if ($id != NULL) {
            TblapplicantEducations::where('edu_id', $id)->update([
                'edu_app_id' => $request->edu_app_id,
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
        $education->edu_app_id = $request->edu_app_id;
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

    public function removeEducationRecord($id){

        TblapplicantEducations::where('edu_id', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
