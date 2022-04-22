<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetVacantPositionsResource;
use App\Models\Employee\TblnextInRank;
use App\Models\Tblagencies;
use App\Models\Tbloffices;
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
     * generatePdf
     * Todo generate PDF file
     */
    public function generatePdf(){
        return $this->tblPantillaVacantPos->generatePdf();
    }

    /**
     * generate vacant memo report ODF FILE
     */
    public function generateVacantMemoPdf(){
        return $this->tblPantillaVacantPos->generateVacantMemoPdf(1);
    }

    /**
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

}
