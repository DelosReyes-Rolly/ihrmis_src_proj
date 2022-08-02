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

    public function closeSelectedVacantPositions(Request $request)
    {

        return $this->tblPantillaVacantPos->closeVacantPositions($request);
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
    public function generateNoticeVpReport($plantillaitems)
    {
        return $this->tblPantillaVacantPos->generateNoticeofVacancyReports($plantillaitems);
    }

    /**
     * generateMemoOnPostingVPForCsc
     * Todo generate PDF file
     */
    public function generateMemoOnPostingVPForCsc()
    {

        return $this->tblPantillaVacantPos->generateMemoOnPostingVpForCscReport();
    }

    /**
     * generateMemoOnPostingVPForDostAgencies
     * Todo generate PDF file
     */
    public function generateMemoOnPostingVP($selected_agency, $plantilla_items)
    {

        return $this->tblPantillaVacantPos->generateMemoOnPostingVp($selected_agency, $plantilla_items);
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
     * Todo get all Plantilla Item details by item state
     * @return array  plantilla items
     */
    public function getPlantillaItemDetails($item_state = 1)
    {

        return GetPlantillaItemResource::collection(
            $this->tblPantillaVacantPos->getPlantillaItemDetails($item_state)
        );

        // return $this->tblPantillaVacantPos->getPlantillaItemDetails($item_state);
    }

    /**
     * getPlantillaItemDetailsById
     * Todo get all Plantilla Item details by id
     * @return array plantilla items
     */
    public function getPlantillaItemDetailsById($item_id)
    {

        // return GetPlantillaItemResource::collection(
        //     $this->tblPantillaVacantPos->getPlantillaItemDetailsById($item_id)
        // );

        return $this->tblPantillaVacantPos->getPlantillaItemDetailsById($item_id);
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
}
