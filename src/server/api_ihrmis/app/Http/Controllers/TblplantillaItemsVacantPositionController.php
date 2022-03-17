<?php

namespace App\Http\Controllers;

use App\Models\TblplantillaItems;
use App\Models\TblplantillaVacantPositions;


/**
 * Description of TblplantillaItemsVacantPositionController
 *
 * @author legee
 */
class TblplantillaItemsVacantPositionController extends Controller {

    public function __construct() {

        $this->tblPantillaVacantPos = new TblplantillaVacantPositions();
    }

    /**
     * getVacantPositions
     * Todo get all vacant positions fro Plantilla Items
     */
    public function getVacantPositions( $type) {
        
        return $this->tblPantillaVacantPos->getVacantPositions($type) ;

    }

    /**
     * generatePdf
     * Todo generate PDF file
     */
    public function generatePdf()
    {
        return $this->tblPantillaVacantPos->generatePdf();
    }
}
