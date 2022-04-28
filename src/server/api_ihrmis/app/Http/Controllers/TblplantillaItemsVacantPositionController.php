<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetVacantPositionsResource;
use App\Models\Employees\TblnextInRank;
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

    /**
     * generate vacant memo report PDF FILE
     */
    public function generateVacantMemoPdf($id){
        return $this->tblPantillaVacantPos->generateVacantMemoPdf($id);
    }

    /**
<<<<<<< HEAD
	 * getAllDostAgencies
	 * Todo get all DOST Agencies
	 * @return array 
	 */
	public function getAllDostAgencies() {

        return $this->tblPantillaVacantPos->getAllDostAgencies();

	}

	/**
	 * getAllDostAgencies
	 * Todo get all DOST Agencies
	 * @return array 
	 */
	public function getAllAgencies()
    {
        return $this->tblPantillaVacantPos->getAllAgencies();
    }
=======
     * get all agency employees
     */
    public function getAgencyEmployees($agency, $plantilla){
        return CommonResource::collection($this->tblPantillaVacantPos->getAgencyEmployees($agency, $plantilla));
    }

    /**
     * get all saved next in rank employees
     */
    public function getNextInRankEmployees($item){
        $empQry = TblnextInRank::where('nir_itm_id', $item)->get();
        return CommonResource::collection($empQry);
    }

    public function addToNextInRank(Request $request){
        return $this->tblPantillaVacantPos->addToNextInRank($request); 
    }

    public function deleteNextInRank(Request $request){

        foreach ($request->item_list as $value) {
          TblnextInRank::where('nir_id', $value['nir_id'])->delete();
        }
        return response()->json(['message' => 'Successfully deleted'], 200);
    }

>>>>>>> 38edc13305e6d2f8e085b95bb5bfb0ffee2df841
}
