<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantVoluntaryWork;
use Illuminate\Http\Request;

class TblapplicantVoluntaryWorkController extends Controller
{
    public function index($id)
    {
        return TblapplicantVoluntaryWork::where('vol_app_id', $id)->get();  
    }
    
    public function store($id, Request $request)
    {
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
