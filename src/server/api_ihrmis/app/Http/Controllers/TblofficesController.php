<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetPlantillaPositionResource;
use App\Http\Resources\TblofficesResource;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TblofficesController extends Controller
{
    public function index(){
    }

    public function store(Request $request)
    {
        return Tbloffices::updateOrCreate(
            [
                'ofc_id' => $request->ofc_id,
            ],
            [
                'ofc_type' => $request->ofc_type,
                'ofc_name' => $request->ofc_name,
                'ofc_acronym' => $request->ofc_acronym,
                'ofc_area_code' => $request->ofc_area_code ?? "000",
                'ofc_area_type' => $request->ofc_area_type ?? "R",
                'ofc_head_itm_id' => $request->ofc_head_itm_id ?? NULL,
                'ofc_oic_itm_id' => $request->ofc_oic_itm_id ?? NULL,
                'ofc_ofc_id' => $request->ofc_ofc_id,
            ]
        );
    }
    
    public function show($id){
        return Tbloffices::findOrFail($id);
    }

     public function office()
    {
        return CommonResource::collection(
            Tbloffices::get(),
        );
    }

    public function plantillaPositions($id)
    {
        $item_qry = TblplantillaItems::with('tblpositions')->where('itm_ofc_id', $id)->get();
        return GetPlantillaPositionResource::collection($item_qry);
    }

    public function plantillaPosition()
    {
        $item_qry = TblplantillaItems::with('tblpositions')->get();
        return GetPlantillaPositionResource::collection($item_qry);
    }

    public function getAllOffices()
    {
        $item_qry = DB::select('SELECT a.,office.parent,heads.,oics.* FROM tbloffices as a 
        LEFT JOIN (SELECT offices.ofc_name as parent,offices.ofc_id  from tbloffices as offices) as office on a.ofc_ofc_id = office.ofc_id
        LEFT JOIN (SELECT pos.pos_title as head,pli.itm_id as plantilla, pli.itm_ofc_id as head_ofc from tblplantilla_items as pli
                  LEFT JOIN tblpositions as pos on pli.itm_pos_id = pos.pos_id) as heads
                  on a.ofc_head_itm_id = heads.plantilla
        LEFT JOIN (SELECT pos.pos_title as oic,pli.itm_id as plantilla_oic, pli.itm_ofc_id as oic_ofc from tblplantilla_items as pli
                  LEFT JOIN tblpositions as pos on pli.itm_pos_id = pos.pos_id) as oics
                  on a.ofc_oic_itm_id = oics.plantilla_oic;');
        return response()->json($item_qry);
    }
}
