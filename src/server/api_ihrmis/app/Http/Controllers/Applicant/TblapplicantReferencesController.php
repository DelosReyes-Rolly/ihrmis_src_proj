<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantReferencesResource;
use App\Models\Applicants\TblapplicantReferences;
use Illuminate\Http\Request;

class TblapplicantReferencesController extends Controller
{
    
    public function getReferenceRecord($id)
    {
        $reference = TblapplicantReferences::where('ref_app_id', $id)->get();
        return ApplicantReferencesResource::collection($reference);
    }

    public function addReferenceRecord($id, Request $request)
    {
        $request->validate([
            'ref_app_name' => 'required|regex:/^[\pL\s\-]+$/u',
            "ref_app_email" => "required|email:rfc",
            'ref_app_addr' => "required",
            'ref_app_tel_no' => "required"
        ],[
            'email' => 'Invalid input',
            'regex' => 'Invalid input',
            'required' => 'This field is required'
        ]);

        $reference = new TblapplicantReferences();
        $reference->ref_app_id = $id;
        $reference->ref_app_email = $request->ref_app_email;
        $reference->ref_app_name = $request->ref_app_name;
        $reference->ref_app_addr = $request->ref_app_addr;
        $reference->ref_app_tel_no = $request->ref_app_tel_no;
        $reference->save();

        return response()->json([
            "status" => "200",
            "message" => "Successfully added a record"
        ]);
    }

    public function removeReferenceRecord($id){
        TblapplicantReferences::where('ref_app_email', $id)->delete();
        return response()->json([
            "status" => "200",
            "message" => "Successfully deleted a record"
        ]);
    }
}
