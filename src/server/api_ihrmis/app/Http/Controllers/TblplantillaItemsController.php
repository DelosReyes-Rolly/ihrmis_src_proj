<?php

namespace App\Http\Controllers;

use App\Http\Resources\Plantilla\TblplantillaItemsResource;
use App\Models\TblplantillaItems;
use Illuminate\Http\Request;

class TblplantillaItemsController extends Controller
{
    //
    public function index(){

        
        $item_query = TblplantillaItems::with('tbloffices', 'tblpositions')->get();

        
        return TblplantillaItemsResource::collection($item_query);
    }

    public function store(Request $request)
    {   

        $request->validate([
            // 'itm_regular' => 'required',
            'itm_no'=> 'max:30|required',
            // 'itm_pos_id'=> 'required',
            // 'itm_ofc_id'=> 'required',
            // 'itm_status'=> 'required', 
            // 'itm_basis'=> 'required',
            // 'itm_category'=> 'required',
            // 'itm_level'=> 'required',
            'itm_function'=> 'required|max:255',
            //'itm_creation'=> 'required',
            // 'itm_source'=> 'required',
            // 'itm_supv1_itm_id'=> 'required',
            // 'itm_supv2_itm_id'=> 'required',
            // 'itm_state'=> 'required',
        ]);

        TblplantillaItems::create([
            'itm_regular' => $request->itm_regular ?? 0,
            'itm_no'=> $request->itm_no,
            'itm_pos_id'=> $request->itm_pos_id ?? 1,
            'itm_ofc_id'=> $request->itm_ofc_id ?? 1,
            'itm_status'=> $request->itm_status ?? 0, 
            'itm_basis'=> $request->itm_basis ?? 0,
            'itm_category'=> $request->itm_category ?? 0,
            'itm_level'=> $request->itm_level ?? 0,
            'itm_function'=> $request->itm_function,
            'itm_creation'=> $request->itm_creation ?? 0,
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
    
    public function show($id){
        return TblplantillaItems::findOrFail($id);
    }

}
