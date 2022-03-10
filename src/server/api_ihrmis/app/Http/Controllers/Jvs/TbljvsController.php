<?php

namespace App\Http\Controllers\Jvs;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Http\Resources\Jvscrw\JvscrwMainResources;
use App\Models\Tbljvs;
use App\Models\TbljvsCompetencies;
use App\Models\TbljvsDutiesRspnsblts;
use App\Models\TblplantillaItems;
use App\Services\Jvscrw\JvscrwService;
use Illuminate\Http\Request;

class TbljvsController extends Controller
{
    
    protected $appService;

    public function __construct(JvscrwService $appService)
    {
        $this->appService = $appService;
    }
    
    public function getPositionCscQualifation($id)
    {
        $item_query = TblplantillaItems::with( 'tbloffices', 'tblpositions.tblpositionCscStandards')->find($id);
        return new JvscrwMainResources($item_query); 
    }

    public function allJvsVersion($itemId)
    {
      $readQuery = Tbljvs::where('jvs_itm_id', $itemId)->get();
      return CommonResource::collection($readQuery);
    }

    public function addCompetencyAndRating(Request $request, $type)
    {  
        $output = $this->appService->updateOrCreateCmpntncyRtng($request, $type);
        return response()->json([
            "status" => $output
        ]);
    }

    public function readCompenencyAndRating($id)
    {
        $data = TbljvsCompetencies::with('tblComType')->where('com_jvs_id', $id)->get();
        return CommonResource::collection($data);
    }

    public function readDutiesAndResponsibilities($id)
    {
        $output = TbljvsDutiesRspnsblts::where('dty_jvs_id', $id)->get();
        return CommonResource::collection($output);
    }


    public function saveSignature(Request $request, $id, $signType)
    {
        $output = $this->appService->uploadImage($request, $id, $signType);
        return response()->json([
            "message" => $output 
        ]);
    }

        // public function addDutiesAndResponsibilities($id, Request $request)
    // {
    //     $output = $this->appService->deleteDutiesResponsibilities($id, $request);
    //     return $output;
    // }


    // public function addDutiesAndResponsibilities($id, Request $request)
    // {
    //     $output = $this->appService->dutiesResponsibilities($id, $request);
    //     return $output;
    // }

    // public function savePreparedBy($id, $request){
    //     $request->validate(["prepared_by" => "mimes:jpeg,png|max:5120"]);
    //     $output = $this->appService->updateOrCreateCmpntncyRtng($id, $request);
    //     return $output;
    // }

    // public function removeCompetencyRating($id, $type, $order){
    //     $output = $this->appService->deleteRating($id, $type, $order);
    //     return response()->json([
    //         "status" => $output
    //     ]);
    // }
}
