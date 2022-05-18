<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantVoluntaryResource;
use App\Models\Applicants\TblapplicantVoluntaryWork;

use Illuminate\Http\Request;

class TblapplicantVoluntaryController extends Controller
{
    public function getVoluntaryRecord($id)
    {
        $voluntary = TblapplicantVoluntaryWork::where('vol_app_id', $id)->get();  
        return ApplicantVoluntaryResource::collection($voluntary);
    }
    
    public function addVoluntaryRecord($id, Request $request)
    {   

        $request->validate([
            "vol_app_org" => "required",
            "vol_app_addr" => "required",
            "vol_app_from" => 'required|date_format:Y-m-d|before:today',
            "vol_app_to" => 'required|date_format:Y-m-d|after:'.$request->vol_app_from,
            "vol_app_hours" => "required",
            "vol_app_work" => "required",
        ],[
            "required" => "This field is required",
            "regex" => "Invalid input",
            "before" => "Invalid input",
            "after" => "Invalid input",
            "date_format" => "Invalid input"
        ]);

        if(isset($request->item)){

            TblapplicantVoluntaryWork::where('vol_app_time', $request->item)->update([
                "vol_app_id" => $id,
                "vol_app_time" => $request->item,
                "vol_app_org" => $request->vol_app_org,
                "vol_app_addr" => $request->vol_app_addr,
                "vol_app_from" => $request->vol_app_from,
                "vol_app_to" => $request->vol_app_to,
                "vol_app_hours" => $request->vol_app_hours,
                "vol_app_work" => $request->vol_app_work,
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Updated Successfully",
            ]);
        }

        $voluntary = new TblapplicantVoluntaryWork();
        $voluntary->vol_app_id = $id;
        $voluntary->vol_app_org = $request->vol_app_org;
        $voluntary->vol_app_from = $request->vol_app_from;
        $voluntary->vol_app_to = $request->vol_app_to;
        $voluntary->vol_app_addr = $request->vol_app_addr;
        $voluntary->vol_app_hours = $request->vol_app_hours;
        $voluntary->vol_app_work = $request->vol_app_work;
        $voluntary->save();
        
        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function removeVoluntaryRecord($id)
    {
        TblapplicantVoluntaryWork::where('vol_app_time', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
