<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantReferences;
use Illuminate\Http\Request;

class TblapplicantReferencesController extends Controller
{
    public function index($id)
    {
        return TblapplicantReferences::where('ref_app_id', $id)->get();
    }

    
    public function store($id, Request $request)
    {   

        $reference = new TblapplicantReferences();
        $reference->ref_app_id = $id;
        $reference->ref_app_name = $request->ref_app_name;
        $reference->ref_app_adr = $request->ref_app_adr;
        $reference->ref_app_tel_no = $request->ref_app_tel_no;
        $reference->save();
        
        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function destroy($id, $timestamp)
    {
        return TblapplicantReferences::where('ref_app_id', $id)->where('ref_app_time', $timestamp)->deleted();
    }

}
