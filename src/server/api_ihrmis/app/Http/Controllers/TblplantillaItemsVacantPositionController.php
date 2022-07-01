<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetEmailTemplateDataResource;
use App\Http\Resources\Plantilla\GetPlantillaItemResource;
use App\Http\Resources\Plantilla\GetVacantPositionsResource;
use App\Models\Employees\TblnextInRank;
use App\Services\PlantillaItems\PlantillaItemsService;
use Illuminate\Http\Request;

/**
 * Description of TblplantillaItemsVacantPositionController
 *
 * @author legee
 */
class TblplantillaItemsVacantPositionController extends Controller
{

    public function __construct()
    {
        $this->tblPantillaVacantPos = new PlantillaItemsService();
    }

    /**
     * getVacantPositions
     * Todo get all vacant positions fro Plantilla Items
     */
    public function getVacantPositions($type)
    {
        return $this->tblPantillaVacantPos->getVacantPositions($type);
    }

    /**
     * getAllPlantillaItems
     * Todo get all positions fro Plantilla Items
     */
    public function getAllPlantillaItems()
    {

        return GetVacantPositionsResource::collection(
            $this->tblPantillaVacantPos->getAllPlantillaItems()
        );
    }

    /**
     * getAPlantillaItemsById
     * Todo get all positions fro Plantilla Items
     */
    public function getPlantillaItemById($id)
    {

        return $this->tblPantillaVacantPos->getPlantillaItemById($id);
    }

    /**
     * getAPlantillaItemsById
     * Todo get all positions fro Plantilla Items
     */
    public function getEmailTemplateData($id)
    {

        return new GetEmailTemplateDataResource($this->tblPantillaVacantPos->getPlantillaItemById($id));
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
    public function generateMemoOnPostingVPForCsc($selected_agency)
    {

        return $this->tblPantillaVacantPos->generateMemoOnPostingVpForCscReport($selected_agency);
    }

    /**
     * generateMemoOnPostingVPForDostAgencies
     * Todo generate PDF file
     */
    public function generateMemoOnPostingVPForDostAgencies($selected_agency)
    {

        return $this->tblPantillaVacantPos->generateMemoOnPostingVpForDostReport($selected_agency);
    }

    public function closeSelectedVacantPositions(Request $request)
    {

        return $this->tblPantillaVacantPos->closeVacantPositions($request);
    }

    /**
     * generate vacant memo report PDF FILE
     */
    public function generateVacantMemoPdf($id)
    {
        return $this->tblPantillaVacantPos->generateVacantMemoPdf($id);
    }

    /**
     * getAllDostAgencies
     * Todo get all DOST Agencies
     * @return array 
     */
    public function getAllDostAgencies()
    {

        return $this->tblPantillaVacantPos->getAllDostAgencies();
    }

    /**
     * getPlantillaItemDetails
     * Todo get all PlantillaItem details
     * @return array getPositionWithCsc
     */
    public function getPlantillaItemDetails($item_state = 1)
    {

        return GetPlantillaItemResource::collection(
            $this->tblPantillaVacantPos->getPlantillaItemDetails($item_state)
        );

        // return $this->tblPantillaVacantPos->getPlantillaItemDetails($item_state);
    }

    /**
     * getPlantillaItemPositionWithCsc
     * Todo get all PlantillaItem Position with CSC
     * @return array getPositionWithCsc
     */
    public function getPlantillaItemPositionWithCsc($id)
    {

        $this->tblPantillaVacantPos->getPositionWithCsc($id);
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

    /**
     * getAllDostAgencies
     * Todo get all DOST Agencies
     * @return array 
     */
    public function getAgency($id)
    {
        return $this->tblPantillaVacantPos->getAgency($id);
    }

    /** get all agency employees
     */
    public function getAgencyEmployees($agency, $plantilla)
    {
        return CommonResource::collection($this->tblPantillaVacantPos->getAgencyEmployees($agency, $plantilla));
    }

    /**
     * get all saved next in rank employees
     */
    public function getNextInRankEmployees($item)
    {
        $empQry = TblnextInRank::where('nir_itm_id', $item)->get();
        return CommonResource::collection($empQry);
    }

    public function addToNextInRank(Request $request)
    {
        return $this->tblPantillaVacantPos->addToNextInRank($request);
    }

    public function deleteNextInRank(Request $request)
    {

        foreach ($request->item_list as $value) {
            TblnextInRank::where('nir_id', $value['nir_id'])->delete();
        }
        return response()->json(['message' => 'Successfully deleted'], 200);
    }
}
