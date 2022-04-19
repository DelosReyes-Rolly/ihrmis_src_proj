<?php

namespace App\Services\PlantillaItems;

use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
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
    // $pdf = PDF::loadView('vacantPositionsPdf',$new_data);
    // $pdf->setPaper('a4', 'landscape')->setWarnings(false)
    // ->setOptions(['dpi' => 150, 'defaultFont' => 'Courier']);
    // return $pdf->stream('DOST-CO Vacant Position_'.$date.'.pdf');
  }


  public function generateVacantMemoPdf($data){
    $report = new MPDF();
    $report->writeHTML(view('reports/vacantMemoReportPdf', $data));
    return $report->output();
  }

}