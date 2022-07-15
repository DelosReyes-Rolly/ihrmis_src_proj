<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetPlantillaPositionResource;
use App\Http\Resources\TblofficesResource;
use App\Models\Employees\Tblagencies;
use App\Models\Tblagencies as ModelsTblagencies;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TblofficesController extends Controller
{
    public function index()
    {
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
                'ofc_email_addr' => $request->ofc_email_addr,
                'ofc_head_itm_id' => $request->ofc_head_itm_id ?? NULL,
                'ofc_agn_id' => $request->ofc_agn_id,
                'ofc_ofc_id' => $request->ofc_ofc_id
            ]
        );
    }

    public function show($id)
    {
        return Tbloffices::findOrFail($id);
    }

    public function office()
    {
        return CommonResource::collection(
            Tbloffices::get(),
        );
    }

    public function agency()
    {
        return CommonResource::collection(
            Tblagencies::get(),
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
        $item_qry = DB::select('SELECT a.*,heads.* FROM tbloffices as a 
        LEFT JOIN (SELECT pos.pos_title as head,pli.itm_id as plantilla, pli.itm_ofc_id as head_ofc from tblplantilla_items as pli
                  LEFT JOIN tblpositions as pos on pli.itm_pos_id = pos.pos_id) as heads
                  on a.ofc_head_itm_id = heads.plantilla;');
        return response()->json($item_qry);
    }

    public function saveAgency(Request $request)
    {
        return Tblagencies::updateOrCreate(
            [
                'agn_id' => $request->agn_id,
            ],
            [
                'agn_name' => $request->agn_name,
                'agn_acronym' => $request->agn_acronym,
                'agn_sector' => $request->agn_sector,
                'agn_head_name' => $request->agn_head_name,
                'agn_head_position' => $request->agn_head_position,
                'agn_head_email' => $request->agn_head_email,
                'agn_address' => $request->agn_address,
            ]
        );
    }
}
