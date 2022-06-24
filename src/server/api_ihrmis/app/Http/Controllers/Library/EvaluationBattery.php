<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Library\EvaluationBatteryModel;
use Illuminate\Http\Request;

class EvaluationBattery extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CommonResource::collection(
            EvaluationBatteryModel::with('Category')->get(),
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if (!empty($request->battery)) {
            EvaluationBatteryModel::where("bat_grp_id", $request->bat_grp_id)->where("bat_sg_type",$request->bat_sg_type)->delete();
            foreach ($request->battery as $battery) {
                EvaluationBatteryModel::updateOrCreate(
                    [
                        'bat_id' => $request->bat_id,
                    ],
                    [
                        'bat_itm_order' => $battery['bat_itm_order'],
                        'bat_name' => $battery['bat_name'],
                        'bat_points' => $battery['bat_points'],
                        'bat_grp_id' => $request->bat_grp_id,
                        'bat_sg_type' => $request->bat_sg_type,
                    ]
                );
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
