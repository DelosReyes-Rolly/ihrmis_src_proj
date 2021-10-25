<?php

namespace App\Http\Controllers;

use App\Models\TbljvsCompetencies;
use Illuminate\Http\Request;

class JvsCompetencyController extends Controller
{
    public function updateCompetency($jvs_id)
    {   
        $findPair = TbljvsCompetencies::find(1);
        dd($findPair->com_type->where('com_jvs_id', 1));
        if($findPair->com_type == 'OE'){
            return [
                'bollean' => true
            ];
        } else {
            return [
                'bollean' => false
            ];
        }   
    }
}
