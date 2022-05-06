<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Models\Applicants\TblapplicantsStatus;
use Illuminate\Http\Request;

class TblapplicantStatusController extends Controller
{
    public function saveStatus(Request $request)
    {
        $dataToSave = new TblapplicantsStatus();
        $dataToSave->sts_app_id = $request->applicant_id;
        $dataToSave->sts_app_stg_id = $request->status_id;
        $dataToSave->sts_app_remarks = $request->status_remark;
        $dataToSave->sts_app_complete = 1;
        $dataToSave->save();
        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }
}
