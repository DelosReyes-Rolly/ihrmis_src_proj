<?php

namespace App\Http\Controllers;

use App\Http\Resources\Plantilla\GetVacantPositionsResource;
use App\Models\TblplantillaItems;
use App\Services\PlantillaItems\PlantillaItemsService;
use Illuminate\Http\Request;

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
     * getVacantPositions
     * Todo get all positions fro Plantilla Items
     */
    public function getAllPositions() {
        
        return GetVacantPositionsResource::collection($this->tblPantillaVacantPos::getAllPlantillaItems()) ;

    }

    /**
     * generatePdf
     * Todo generate PDF file
     */
    public function generateVpReport()
    {
        return $this->tblPantillaVacantPos->generateVacantPositionsReport();
    }

    /**
     * generateNoticeVpReport
     * Todo generate PDF file
     */
    public function generateNoticeVpReport()
    {
        return $this->tblPantillaVacantPos->generateNoticeofVacancyReports();
    }

    /**
     * generateMemoOnPostingVPForCsc
     * Todo generate PDF file
     */
    public function generateMemoOnPostingVPForCsc()
    {
        return $this->tblPantillaVacantPos->generateMemoOnPostingVpReport();
    }

     /**
     * generateMemoOnPostingVPForDostAgencies
     * Todo generate PDF file
     */
    public function generateMemoOnPostingVPForDostAgencies()
    {
        return $this->tblPantillaVacantPos->generateMemoOnPostingVpForDostReport();
    }

    public function closeSelectedVacantPositions(Request $request){
        
        return $this->tblPantillaVacantPos->closeVacantPositions($request); 
    }
}
