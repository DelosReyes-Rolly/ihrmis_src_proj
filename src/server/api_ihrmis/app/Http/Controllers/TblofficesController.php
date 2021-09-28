<?php

namespace App\Http\Controllers;

use App\Http\Resources\TblofficesResource;
use App\Models\Tbloffices;
use Illuminate\Http\Request;

class TblofficesController extends Controller
{
    public function index(){
        return TblofficesResource::collection(Tbloffices::all()); 
    }

    public function store(Request $request)
    {
        return Tbloffices::create([
            'ofc_type' => $request->ofc_type,
            'ofc_name' => $request->ofc_name,
            'ofc_acronym' => $request->ofc_acronym,
            'ofc_area_code' => $request->ofc_area_code ?? "000",
            'ofc_area_type' => $request->ofc_area_type ?? "R",
            'ofc_head_itm_id'=> $request->ofc_head_itm_id,
            'ofc_oic_itm_id' => $request->ofc_oic_itm_id,
            'ofc_ofc_id' => $request->ofc_ofc_id,
        ]);
    }
    
    public function show($id){
        return Tbloffices::findOrFail($id);
    }
}
