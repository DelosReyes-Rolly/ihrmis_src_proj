<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\TblplantillaItemsResource;
use App\Models\Tbloffices;
use App\Models\TblplantillaDutiesRspnsblts;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use Illuminate\Http\Request;

class TblplantillaItemsController extends Controller
{
    //
    public function getPlantillaItem($type)
    {
        $item_query = TblplantillaItems::with('tbloffices', 'tblpositions', 'employee')->where('itm_regular', $type)->get();
        return TblplantillaItemsResource::collection($item_query);
    }

    public function getOpenPlantillaItems()
    {
        $item_query = TblplantillaItems::with('tbloffices', 'tblpositions')->get();
        return CommonResource::collection($item_query);
    }

    public function getPlantillaItemById($id)
    {
        $item_query = TblplantillaItems::find($id);
        return new CommonResource($item_query);
    }

    public function addPlantillaItem(Request $request, $id){   
        try {
            $plantillaQry = TblplantillaItems::firstOrNew(["itm_id" => $id]);
            $plantillaQry->itm_regular = $request->itm_regular;
            $plantillaQry->itm_no = $request->itm_no;
            $plantillaQry->itm_pos_id = $request->itm_pos_id;
            $plantillaQry->itm_ofc_id = $request->itm_ofc_id;
            $plantillaQry->itm_status = $request->itm_status;
            $plantillaQry->itm_basis = $request->itm_basis;
            $plantillaQry->itm_category = $request->itm_category;
            $plantillaQry->itm_level = $request->itm_level;
            $plantillaQry->itm_function = $request->itm_function;
            $plantillaQry->itm_creation = $request->itm_creation;
            $plantillaQry->itm_source = $request->itm_source ?? 0;
            $plantillaQry->itm_supv1_itm_id = $request->itm_supv1_itm_id ?? 0;
            $plantillaQry->itm_supv2_itm_id = $request->itm_supv2_itm_id ?? 0;
            $plantillaQry->itm_state = $request->itm_state ?? 1;
            $plantillaQry->save();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Failed, Try again later",
            ], 400);
        }

        return response()->json([
            'message' => "Added Successfully",
        ], 200);
    }

    public function showItemDetail($id)
    {
        $item_qry = TblplantillaItems::with('tbloffices', 'tblpositions')->findOrFail($id);
        return new TblplantillaItemsResource($item_qry);
    }

    public function officePosition()
    {

        return new CommonResource([
            'positions' => Tblpositions::get(),
            'offices' => Tbloffices::get(),
        ]);
    }

    public function getDutiesAndResponsibility($id)
    {
        $item_qry = TblplantillaDutiesRspnsblts::where('dty_itm_id', $id)->get();
        return CommonResource::collection($item_qry);
    }

    public function getPlantillaItemByOffice($id)
    {
       $item_query = TblplantillaItems::where("itm_ofc_id", $id)->with('tblpositions')->get();
       return CommonResource::collection($item_query);
    }

    public function getNextInRank($id)
    {
        $item_qry = TblplantillaItems::with('applicant.employee')->find($id);
        return new CommonResource($item_qry);
    }

    public function getAllVacantPlantillaItems(){
        $item_qry = TblplantillaItems::where("itm_state", 1)->get();
        return response()->json([
            "total_vacant" => count($item_qry)
        ]);
    }

    public function updateEvaluationState(Request $request)
    {
        return TblplantillaItems::updateOrCreate(
            [
                'itm_id' => $request->plantilla,
            ],
            [
                'deadline' => $request->deadline,
                'itm_state' => $request->state,
                'grp_cluster' => $request->grp_cluster,
            ]
        );
    }


    public function removePlantilla($id)
    {
        try {
            $itemQry = TblplantillaItems::where("itm_id", $id)->delete();
            return response()->json([
                "message" => "Successfully deleted Plantilla"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Unable To Delete Plantilla"
            ], 422);
        }
    }
}
