<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantOtherInfo;
use Illuminate\Http\Request;

class TblapplicantOtherInfoController extends Controller
{
    public function index($id, $type)
    {
        return TblapplicantOtherInfo::where('oth_app_id', $id)->where('oth_app_type', $type)->get();
    }

    public function store($id, Request $request)
    {   

        $information = new TblapplicantOtherInfo();
        $information->oth_app_id = $id;
        $information->oth_app_type = $request->oth_app_type;
        
        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function destroy($id, $timestamp)
    {
        return TblapplicantOtherInfo::where('oth_app_id', $id)->where('oth_app_time', $timestamp)->deleted();
    }
}
