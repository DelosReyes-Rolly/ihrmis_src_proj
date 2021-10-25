<?php

namespace App\Http\Controllers;

use App\Http\Resources\Jvscrw\JvscrwMainResources;
use App\Models\Tbljvs;
use App\Models\TbljvsCompetencies;
use App\Models\TbljvsCompetencyRatings;
use App\Models\TblplantillaItems;
use Illuminate\Http\Request;

class JvscrwMainController extends Controller
{
    // protected $version = 
    
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

        return JvscrwMainResources::collection($item_query, 1);
    }

    public function writeJvs($id, Request $request)
    {
        

        $competencies = [];

        $jvs = Tbljvs::where('jvs_itm_id', $id)->create([
            'jvs_itm_id' => $id,
            'jvs_prepared' => "Tezada",
            'jvs_approved' => "Jamal",
            'jvs_version' => "1",
            'jvs_min_com_desc' => "Second Version JVS",
            'jvs_signed_file' => "files",
        ]);

        // $request->we_type
        if(true == true){
            array_push(
                $competencies, 
                new TbljvsCompetencies([
                    'com_type' => 'WE',
                    'com_specific' => 'Specific'
            ]));
        }
        //$request->oe_type
        if(true == true){
            array_push(
                $competencies,
                new TbljvsCompetencies([
                    'com_type' => 'OE',
                    'com_specific' => 'Specific'
            ]));
        }

        

        $jvs->tbljvsCompetencies()->saveMany($competencies);

        return [
            'status' => '200',
            'message' => 'Data Written  Successfully'
        ];
    }
}



// if($request->cw_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'CW',
//             'com_specific' => 'Specific'
//     ]));
// }
// if($request->as_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'AS',
//             'com_specific' => 'Specific'
//     ]));
// }
// if($request->cs_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'CS',
//             'com_specific' => 'Specific'
//     ]));
// }
// if($request->ot_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'OT',
//             'com_specific' => 'Specific'
//     ]));
// }
// if($request->ed_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'ED',
//             'com_specific' => 'Specific'
//     ]));  
// }
// if($request->tr_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'TR',
//             'com_specific' => 'Specific'
//     ]));  
// }
// if($request->ex_type == true){
//     array_push(
//         $competencies,
//         new TbljvsCompetencies([
//             'com_type' => 'EX',
//             'com_specific' => 'Specific'
//     ])); 
// }