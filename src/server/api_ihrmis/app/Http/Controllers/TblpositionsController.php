<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetOfficesPositionResource;
use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\Tblpositions;
use Illuminate\Http\Request;

class TblpositionsController extends Controller
{
    // SUBJECT TO CHANGE
    public function index(){
        return CommonResource::collection(Tblpositions::with('tbloffices'));
    }

    public function store(Request $request)
    {
        return Tblpositions::create([
            'pos_title' => $request->pos_title,
            'pos_short_name' => $request->pos_short_name,
            'pos_salary_grade' => $request->pos_salary_grade,
            'pos_category' => $request->pos_category,
        ]);
    }
    
    public function show($id){
        return Tblpositions::findOrFail($id);
    }

    public function getPositionWithCsc( $id)
    {
        $getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
        return new GetPositionWithCscResource($getQry);
    }
    
}
