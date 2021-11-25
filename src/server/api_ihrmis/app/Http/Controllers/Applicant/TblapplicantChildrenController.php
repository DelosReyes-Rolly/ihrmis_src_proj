<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantChildren;
use App\Models\Applicants\TblapplicantsFamily;
use Illuminate\Http\Request;

class TblapplicantChildrenController extends Controller
{
    public function getChildrenRecord($id){
        $getChildrenQry = TblapplicantChildren::where('chi_app_id', $id)->get();
        return CommonResource::collection($getChildrenQry);
    }

    public function addChildrenRecord($id, Request $request){
        $request->validate([
            'chi_app_name' => 'required',
            'chi_app_birthdate' => 'required',
        ],[
            'required' => "This field is required"
        ]);
        $getChildrenQry = new TblapplicantChildren();
        $getChildrenQry->chi_app_id = $id;
        $getChildrenQry->chi_app_name =  $request->chi_app_name;
        $getChildrenQry->chi_app_birthdate =  $request->chi_app_birthdate;
        $getChildrenQry->save();
    }

    public function removeChildrenRecord($id){
        TblapplicantChildren::where('chi_timestamp_id', $id)->delete();
    }



}
