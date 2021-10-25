<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantCseligibilities;
use Illuminate\Http\Request;

class TblapplicantCseligibilitiesController extends Controller
{
    public function index($id)
    {
        return TblapplicantCseligibilities::where('cse_app_id', $id)->get();
    }
    
    public function store($id, Request $request)
    {
        $cseLigibility = new TblapplicantCseligibilities();
        $cseLigibility->cse_app_id = $id;
        $cseLigibility->cse_app_title = $request->cse_app_title;
        $cseLigibility->cse_app_date = $request->cse_app_date;
        $cseLigibility->cse_app_place = $request->cse_app_place;
        $cseLigibility->cse_app_rating = $request->cse_app_rating;
        $cseLigibility->cse_app_license = $request->cse_app_license;
        $cseLigibility->cse_app_validity = $request->cse_app_validity;
        $cseLigibility->save();

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
