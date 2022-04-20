<?php

namespace App\Services\PlantillaItems;

use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use Barryvdh\DomPDF\Facade as PDF;
use Mpdf\Mpdf as mpdf;

class PlantillaItemsService
{

  public function getPositionWithCsc($id)
  {
    $getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
    return new GetPositionWithCscResource($getQry);
  }

  /**
   * getVacantPositions
   * Todo get vacant positions by 
   */
  public function getVacantPositions($type)
  {

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

    foreach ($data as $itm) {
      $positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
      $itm->positionswithcscstandards = $positionswithcscstandards;
    }



    $new_data['vacantpositions'] = $data;

    $date = date('m/d/Y');
    $mpdf = new mpdf(['orientation' => 'L','format' => 'A4']);
    $mpdf->WriteHTML(view('pdf_templates/vacantPositionsPdf',['vacantpositions' => $data]));
    return $mpdf->Output();
    // $report = new mpdf();
    // $report->Output();
    // $pdf = PDF::loadView('vacantPositionsPdf',$new_data);
    // $pdf->setPaper('a4', 'landscape')->setWarnings(false)
    // ->setOptions(['dpi' => 150, 'defaultFont' => 'Courier']);
    // return $pdf->stream('DOST-CO Vacant Position_'.$date.'.pdf');
  }
}
