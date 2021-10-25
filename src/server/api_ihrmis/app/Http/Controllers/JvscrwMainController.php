<?php

namespace App\Http\Controllers;

use App\Http\Resources\Jvscrw\JvscrwMainResources;
use App\Models\TblplantillaItems;
use Illuminate\Http\Request;

class JvscrwMainController extends Controller
{
    public function index(){
        $item_query = TblplantillaItems::with(
            'tbloffices',
            'tblpositions.tblpositionCscStandards')
            ->get();
        return  JvscrwMainResources::collection($item_query); 
    }

    public function show($id){
        $item_query = TblplantillaItems::with('tblpositions','tbloffices', 'tbljvs')
            ->where('itm_id', $id)
            ->get();

        return JvscrwMainResources::collection($item_query);
    }


    //Education
    public function getEducation(){

    }

    public function addEducation(){

    }

    //Relevant Training
    public function getRelevantTraining(){
        
    }

    public function addRelevantTraining(){
        
    }

    //Relevant Experience
    public function getRelevantExperience(){
        
    }

    public function addRelevantExperience(){
        
    }
}
