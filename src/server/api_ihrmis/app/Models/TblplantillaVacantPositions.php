<?php

namespace App\Models;

use App\Http\Resources\Plantilla\GetVacantPositionsResource;
use Barryvdh\DomPDF\Facade as PDF;

class TblplantillaVacantPositions extends TblplantillaItems
{

  /**
   * getVacantPositions
   * Todo get vacant positions by 
   */
  public function getVacantPositions($type) {

    $item_query = TblplantillaItems::with('tbloffices', 'tblpositions')->where('itm_is_vacant', $type)->get();
    return GetVacantPositionsResource::collection($item_query);

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

      $new_data['vacantpositions'] = $data;
      
      $date = date('m/d/Y');
      $pdf = PDF::loadView('vacantPositionsPdf', $new_data);
      $pdf->setPaper('a4', 'landscape')->setWarnings(false)
      ->setOptions(['dpi' => 150, 'defaultFont' => 'Courier']);
      return $pdf->stream('DOST-CO Vacant Position_'.$date.'.pdf');
    }

}
