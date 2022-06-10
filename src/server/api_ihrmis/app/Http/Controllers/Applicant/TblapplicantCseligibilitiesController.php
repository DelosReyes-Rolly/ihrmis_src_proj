<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantCseligibilities;
use Illuminate\Http\Request;

class TblapplicantCseligibilitiesController extends Controller
{
    public function getCseligibilityRecord($id)
    {
        $cseLigibility = TblapplicantCseligibilities::where('cse_app_id', $id)->get();
        return CommonResource::collection($cseLigibility);
    }

    public function addCseligibilityRecord($cseId = null, Request $request)
    {
        $request->validate([
            "cse_app_title" => "required",
            "cse_app_date" => "required",
            "cse_app_place" => "required",
            "cse_app_rating" => "numeric",
            "cse_app_license" => "required",
            "cse_app_validity" => "required",
        ], [
            "required" => "This field is required",
            "numeric" => "Must be number"
        ]);

        if ($cseId != NULL) {
            $cseLigibility = TblapplicantCseligibilities::where("cse_id", $cseId)->first();
            $cseLigibility->cse_app_id = $request->cse_app_id;
            $cseLigibility->cse_app_title = $request->cse_app_title['value'];
            $cseLigibility->cse_app_date = $request->cse_app_date;
            $cseLigibility->cse_app_place = $request->cse_app_place;
            $cseLigibility->cse_app_rating = $request->cse_app_rating;
            $cseLigibility->cse_app_license = $request->cse_app_license;
            $cseLigibility->cse_app_validity = $request->cse_app_validity;
            $cseLigibility->save();
            return response()->json([
                "message" => "Successfully Updated!"
            ], 200);
        }

        $cseLigibility = new TblapplicantCseligibilities();
        $cseLigibility->cse_app_id = $request->cse_app_id;
        $cseLigibility->cse_app_title = $request->cse_app_title['value'];
        $cseLigibility->cse_app_date = $request->cse_app_date;
        $cseLigibility->cse_app_place = $request->cse_app_place;
        $cseLigibility->cse_app_rating = $request->cse_app_rating;
        $cseLigibility->cse_app_license = $request->cse_app_license;
        $cseLigibility->cse_app_validity = $request->cse_app_validity;
        $cseLigibility->save();
        return response()->json([
            "message" => "Successfully Added"
        ], 200);
    }

    public function removeCseligibilityRecord($id)
    {
        TblapplicantCseligibilities::where('cse_id', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
