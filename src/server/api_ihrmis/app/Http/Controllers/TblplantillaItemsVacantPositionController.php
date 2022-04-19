<?php

namespace App\Http\Controllers;

use App\Http\Resources\Plantilla\GetVacantPositionsResource;
use App\Services\PlantillaItems\PlantillaItemsService;


/**
 * Description of TblplantillaItemsVacantPositionController
 *
 * @author legee
 */
class TblplantillaItemsVacantPositionController extends Controller {

    public function __construct() {

        $this->tblPantillaVacantPos = new PlantillaItemsService();
    }

    /**
     * getVacantPositions
     * Todo get all vacant positions fro Plantilla Items
     */
    public function getVacantPositions( $type) {
        
        return GetVacantPositionsResource::collection($this->tblPantillaVacantPos::getVacantPositions($type)) ;

    }

    /**
     * generatePdf
     * Todo generate PDF file
     */
    public function generatePdf()
    {
        return $this->tblPantillaVacantPos->generatePdf();
    }

    public function generateVacantMemoPdf(){
        return $this->tblPantillaVacantPos->generateVacantMemoPdf(["hello" => "world"]);
    }
}
