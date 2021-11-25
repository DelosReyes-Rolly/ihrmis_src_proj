<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantOtherInfoResource;
use App\Models\Applicants\TblapplicantOtherInfo;
use Illuminate\Http\Request;

class TblapplicantOtherInfoController extends Controller
{
    public function getOtherInfoRecord($id)
    {   
        $otherInfo = TblapplicantOtherInfo::where('oth_app_id', $id)->get();
        return ApplicantOtherInfoResource::collection($otherInfo);
    }

    public function addOtherInfoRecord($id, Request $request)
    {

        $request->validate([
            'oth_app_desc' => 'required'
        ],[
            'required' => 'This field is required'
        ]);
        
        $otherInfo = new TblapplicantOtherInfo();
        $otherInfo->oth_app_id = $id;
        $otherInfo->oth_app_type = $request->oth_app_type;
        $otherInfo->oth_app_desc = $request->oth_app_desc;
        $otherInfo->save();

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function removeOtherInfoRecord($id)
    {
        TblapplicantOtherInfo::where('oth_app_time', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Delete Successfully",
        ]);
    }

}
