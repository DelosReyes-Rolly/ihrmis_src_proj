<?php

namespace App\Services\PlantillaItems;

use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\Employee\TblnextInRank;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use Illuminate\Http\Request;
use Mpdf\Mpdf as MPDF;
// use Meneses\LaravelMpdf\Facades\LaravelMpdf as PDF;

class PlantillaItemsService {

  public function getPositionWithCsc( $id)
  {
      $getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
      return new GetPositionWithCscResource($getQry);
  }

  /**
   * getVacantPositions
   * Todo get vacant positions by 
   */
  public function getVacantPositions($type) {
    $item_query = TblplantillaItems::with('tbloffices', 'tblpositions')->where('itm_state', $type)->get();
    return $item_query;
  }
    
  /**
   * generatePdf
   * Todo this function will generate report in PDF form
   */
  public function generatePdf()
  {
  
    date_default_timezone_set('Asia/Manila'); //define local time
    
    $data = $this->getVacantPositions(1);

    $new_data = [];

    foreach($data as $itm){
        $positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
        $itm->positionswithcscstandards = $positionswithcscstandards;
    }
 
    $new_data['vacantpositions'] = $data;
    
    $date = date('m/d/Y');
  }


  public function generateVacantMemoPdf($type){
    return Tbloffices::with(["plantillaItems" => function ($query) {
      $query->where('itm_regular', 1);
    }])->find(1);
  }

  public function getAgencyEmployees($agency, $plantilla){
    $itemQry = Tbloffices::where('ofc_agn_id', $agency)->with('plantillaItems.employee', 'plantillaItems.tblpositions')->get();
    $nextRankQrt = TblnextInRank::where('nir_itm_id', 1)->get();
    $arrEmpIdHolder =[];
    foreach($nextRankQrt as $value){
      array_push($arrEmpIdHolder, $value->nir_emp_id);
    }

    $arrHolder = [];
    foreach ($itemQry as $offices) {
      foreach($offices->plantillaItems as $items){
        if($items->employee != null){
          if(!in_array($items->employee->emp_id, $arrEmpIdHolder)){
            $name = $items->employee->emp_nm_last . ", " . $items->employee->emp_nm_last . " " .  $items->employee->emp_nm_mid . " " .  $items->employee->emp_nm_extn;
            array_push($arrHolder, [
            'nir_name' => $name,
            'nir_email' =>  $items->employee->emp_ofc_email,
            'nir_office' => $offices->ofc_acronym,
            'nir_pos_title' => $items->tblpositions->pos_title,
            'nir_emp_id' => $items->employee->emp_id,
            'nir_ofc_id' => $offices->ofc_id,
            'nir_agn_id' => (int)$agency,
            'nir_itm_id' => 1
            ]);
          }
        }
      }
    }

    return $arrHolder;

  }

  public function addToNextInRank($request){

    $listHolder = $request->emp_list;
    // return $listHolder;
    foreach ($listHolder as $value) {
      $addQry = new TblnextInRank();
      $addQry->nir_name = $value['nir_name'];
      $addQry->nir_email =  $value['nir_email'];
      $addQry->nir_office = $value['nir_office'];
      $addQry->nir_pos_title = $value['nir_pos_title'];
      $addQry->nir_emp_id = $value['nir_emp_id'];
      $addQry->nir_ofc_id = $value['nir_ofc_id'];
      $addQry->nir_agn_id = $value['nir_agn_id'];
      $addQry->nir_itm_id = $value['nir_itm_id'];
      $addQry->save();
    }

    return response()->json([
      "message" => "Successfully Added",
    ], 200);
  }


}