<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Http\Resources\Library\EvaluationBattery as LibraryEvaluationBattery;
use App\Models\Library\EvaluationBatteryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EvaluationBattery extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $battery = EvaluationBatteryModel::with('Category')->get();
        return new LibraryEvaluationBattery($battery);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $delete = false;
        $checker = EvaluationBatteryModel::where("bat_grp_id", $request->bat_grp_id)->where("bat_sg_type", $request->bat_sg_type)->get();
        if (!$checker->isEmpty()) {
            $delete = true;
        }
        if (!empty($request->battery)) {

            if ($delete) {
                EvaluationBatteryModel::where("bat_grp_id", $request->bat_grp_id)->where("bat_sg_type", $request->bat_sg_type)->delete();
                while ($delete) {
                    $checker2 = EvaluationBatteryModel::where("bat_grp_id", $request->bat_grp_id)->where("bat_sg_type", $request->bat_sg_type)->first();
                    if ($checker2->isEmpty()) {
                        $delete = false;
                    }
                }
            }
            foreach ($request->battery as $battery) {
                $query = EvaluationBatteryModel::firstOrNew(["bat_id" => $request->bat_id]);
                $query->bat_itm_order = $battery['bat_itm_order'];
                $query->bat_name = $battery['bat_name'];
                $query->bat_points = $battery['bat_points'];
                $query->bat_grp_id = $request->bat_grp_id;
                $query->bat_sg_type = $request->bat_sg_type;
                $query->save();
            }
            return response()->json([
                "message" => "Success"
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, $type)
    {
        return CommonResource::collection(
            EvaluationBatteryModel::whereHas('Category', function ($query) use ($id) {
                return $query->where('tblcategory_groups.grp_id', $id);
            })->where('bat_sg_type', $type)->get(),
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        EvaluationBatteryModel::where('bat_grp_id', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
