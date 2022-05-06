<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantCseligibilityResource;
use App\Models\Applicants\TblapplicantCseligibilities;
use Illuminate\Http\Request;

class TblapplicantCseligibilitiesController extends Controller
{
    public function getCseligibilityRecord($id)
    {   
        $cseLigibility = TblapplicantCseligibilities::where('cse_app_id', $id)->get();
        return ApplicantCseligibilityResource::collection($cseLigibility);
    }
    
    public function addCseligibilityRecord($id, Request $request)
    {   

        $request->validate([
            "cse_app_title" => "required",
            "cse_app_date" => "required",
            "cse_app_place" => "required",
            "cse_app_rating" => "numeric",
            "cse_app_license" => "required",
            "cse_app_validity" => "required",
        ],[
            "required" => "This field is required",
            "numeric" => "Must be number"
        ]);

        if(isset($request->item)){
            TblapplicantCseligibilities::where('cse_app_time',$request->item)->update([
                'cse_app_id' => $id,
                'cse_app_time' => $request->item,
                'cse_app_title' => $request->cse_app_title[0]['value'],
                'cse_app_date' => $request->cse_app_date,
                'cse_app_place' => $request->cse_app_place,
                'cse_app_rating' => $request->cse_app_rating,
                'cse_app_license' => $request->cse_app_license,
                'cse_app_validity' => $request->cse_app_validity,
            ]);
        } else {
            $cseLigibility = new TblapplicantCseligibilities();
            $cseLigibility->cse_app_id = $id;
            $cseLigibility->cse_app_title = $request->cse_app_title[0]['value'];
            $cseLigibility->cse_app_date = $request->cse_app_date;
            $cseLigibility->cse_app_place = $request->cse_app_place;
            $cseLigibility->cse_app_rating = $request->cse_app_rating;
            $cseLigibility->cse_app_license = $request->cse_app_license;
            $cseLigibility->cse_app_validity = $request->cse_app_validity;
            $cseLigibility->save();
        }
        

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }


    public function removeCseligibilityRecord($id)
    {
        TblapplicantCseligibilities::where('cse_app_time', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
