<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantTrainings;
use Illuminate\Http\Request;

class TblapplicantTrainingsController extends Controller
{
    public function index($id)
    {
        return TblapplicantTrainings::where('trn_app_id', $id)->get();   
    }
    
    public function store($id, Request $request)
    {
        # code...
        $training = new TblapplicantTrainings();
        $training->trn_app_id = $id;
        $training->trn_app_title = $request->trn_app_title;
        $training->trn_app_from = $request->trn_app_from;
        $training->trn_app_to = $request->trn_app_to;
        $training->trn_app_hours = $request->trn_app_hours;
        $training->trn_app_type = $request->trn_app_type;
        $training->trn_app_sponsors = $request->trn_app_sponsors;
        $training->save();

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
