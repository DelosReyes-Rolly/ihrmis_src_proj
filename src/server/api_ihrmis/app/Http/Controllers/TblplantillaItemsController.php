<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetOfficesPositionResource;
use App\Http\Resources\Plantilla\TblplantillaItemsResource;
use App\Models\Tbloffices;
use App\Models\TblplantillaDutiesRspnsblts;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use Illuminate\Http\Request;

class TblplantillaItemsController extends Controller
{
    //
    public function getPlantillaItem($type){
        $item_query = TblplantillaItems::with('tbloffices', 'tblpositions')->where('itm_regular', $type)->get();
        return TblplantillaItemsResource::collection($item_query);
    }

    public function store(Request $request)
    {   

        // $request->validate([
        //     'itm_no'=> 'max:30|required',
        //     'itm_function'=> 'required|max:255',
        // ]);

        TblplantillaItems::create([
            'itm_regular' => $request->itm_regular,
            'itm_no'=> $request->itm_no,
            'itm_pos_id'=> $request->itm_pos_id,
            'itm_ofc_id'=> $request->itm_ofc_id,
            'itm_status'=> $request->itm_status, 
            'itm_basis'=> $request->itm_basis,
            'itm_category'=> $request->itm_category,
            'itm_level'=> $request->itm_level,
            'itm_function'=> $request->itm_function,
            'itm_creation'=> $request->itm_creation,
            'itm_source'=> $request->itm_source ?? 0,
            'itm_supv1_itm_id'=> $request->itm_supv1_itm_id ?? 0,
            'itm_supv2_itm_id'=> $request->itm_supv2_itm_id ?? 0,
            'itm_state'=> $request->itm_state ?? 0,
        ]);
        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }
    
    public function showItemDetail($id){
        $item_qry = TblplantillaItems::with('tbloffices', 'tblpositions')->findOrFail($id);
        return new TblplantillaItemsResource($item_qry);
    }

    public function officePosition(){

        return new GetOfficesPositionResource([
            'positions' => Tblpositions::get(), 
            'offices' => Tbloffices::get(),
        ]);
    }

    public function getDutiesAndResponsibility($id)
    {
        $item_qry = TblplantillaDutiesRspnsblts::where('dty_itm_id' ,$id)->get();
        return CommonResource::collection($item_qry);
    }

}
