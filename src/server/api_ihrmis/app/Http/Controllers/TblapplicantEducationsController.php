<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantEducations;
use Illuminate\Http\Request;

class TblapplicantEducationsController extends Controller
{
    public function index($id)
    {
        return TblapplicantEducations::where('edu_app_id', $id)->get();
    }
    
    public function store($id, Request $request)
    {
        
        $education = new TblapplicantEducations();
        $education->edu_app_id = $id;
        $education->edu_app_time = $request->edu_app_time;
        $education->edu_app_level = $request->edu_app_level;
        $education->edu_app_school = $request->edu_app_school;
        $education->edu_app_from = $request->edu_app_from;
        $education->edu_app_to = $request->edu_app_to;
        $education->edu_app_degree = $request->edu_app_degree;
        $education->edu_app_graduated = $request->edu_app_graduated;
        $education->edu_app_units = $request->edu_app_units;
        $education->edu_app_honors = $request->edu_app_honors;
        $education->save();

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

    public function destroy($id, $del)
    {
        
        TblapplicantEducations::where('edu_app_id', $id)->where('edu_app_idref', $del)->delete();
        
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}


