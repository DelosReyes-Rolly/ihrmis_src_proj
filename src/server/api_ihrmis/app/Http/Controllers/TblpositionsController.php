<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Http\Resources\Plantilla\GetPositionCscStandardResource;
use App\Models\TblpositionCscStandards;
use App\Models\Tblpositions;
use Illuminate\Http\Request;

class TblpositionsController extends Controller
{
    // SUBJECT TO CHANGE
    public function index(){
        return CommonResource::collection(Tblpositions::with('tbloffices'));
    }

    public function addPosition(Request $request)
    {
        
        try {
            $create_pos_qry = Tblpositions::firstOrNew(["pos_id" => $request->pos_id]);
            $create_pos_qry->pos_title = $request->pos_title;
            $create_pos_qry->pos_short_name = $request->pos_short_name;
            $create_pos_qry->pos_salary_grade = $request->pos_salary_grade;
            $create_pos_qry->pos_category = $request->pos_category;
            $create_pos_qry->save();
            $posID = $create_pos_qry->pos_id;   
    
            $arrayEligibility = [];
            foreach ($request->eligibility as $value) {
                array_push($arrayEligibility, $value['value']);
            } 
            $this->addCscStandards($posID, "CS", 0,  implode("|", $arrayEligibility), $request->eli_specify);
    
            $arrayEducationKey = [];
            foreach($request->education as $value){
                array_push($arrayEducationKey,  $value['level'].":".$value['keyword']);
            }
            $this->addCscStandards($posID, "ED", 0,  implode("|", $arrayEducationKey), $request->edu_specify);
            $this->addCscStandards($posID, "EX", $request->exp_year,  $request->exp_keyword, $request->exp_specify);
            $this->addCscStandards($posID, "TR", $request->trn_hour,  $request->trn_keyword, $request->trn_specify);
    
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json([
            "status" => "success"
        ]);
        
    }

    public function getPosition($id){
        $getPositionQry = Tblpositions::with('tblpositionCscStandards')->find($id);
        return new GetPositionCscStandardResource($getPositionQry);
    }
    
    public function show($id){
        return Tblpositions::findOrFail($id);
    }

    public function getPositionWithCsc($id = NULL)
    {
        if($id == NULL){
            $getQry = Tblpositions::with("tblpositionCscStandards")->get();
            return GetPositionWithCscResource::collection($getQry);
        }
        $getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
        return new GetPositionWithCscResource($getQry);
    }
    

    private function addCscStandards($id, $type, $stdQuantity, $keyword, $specific)
    {
        try {
            $checkQry = TblpositionCscStandards::where("std_pos_id", $id)->where("std_type", $type)->first();
            if(!isset($checkQry)){
                $create_csc_qry = new TblpositionCscStandards();
                $create_csc_qry->std_pos_id = $id;
                $create_csc_qry->std_type = $type;
                $create_csc_qry->std_quantity = $stdQuantity;
                $create_csc_qry->std_keyword = $keyword;
                $create_csc_qry->std_specifics = $specific;
                $create_csc_qry->save();
            } else {
                
                TblpositionCscStandards::where('std_pos_id', $id)->where('std_type', $type)->update([
                    'std_pos_id' => $id,
                    'std_type' => $type,
                    'std_quantity' => $stdQuantity,
                    'std_keyword' => $keyword,
                    'std_specifics' => $specific
                ]);
            }   
            
        } catch (\Throwable $th) {
            throw $th;
        }
        
    }

}
