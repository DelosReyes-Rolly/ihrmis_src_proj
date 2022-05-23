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
      $readQuery = Tbljvs::where('jvs_itm_id', $itemId)->orderBy('jvs_version', 'DESC')->get();
      return CommonResource::collection($readQuery);
    }

    public function addCompetencyAndRating(Request $request)
    {  
        $output = $this->appService->updateOrCreateCmpntncyRtng($request);
        return response()->json([
            "status" => $output
        ]);
    }

    public function readCompenencyAndRating($id)
    {
        $data = TbljvsCompetencies::where('com_jvs_id', $id)->with(['tblComType' => function ($query) use ($id){
            $query->where('rtg_id', $id);
        }])->get();
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

    public function getSignatureDisplay($id){
        $output = $this->appService->getImageSaved($id);
        return $output;
    }

    public function generatedPdf($id){
        $query = Tbljvs::find($id);
        $path = public_path('storage/jvscrw/generate_pdf/'.$query->jvs_signed_file);

        if(!is_file($path)){
            return response()->json([
                "message" => "Please submit to generate JVSCRW document"
            ], 422);
        }

        return response()->file($path);
    }

    public function newVersion ($item) {   
        return $this->appService->createNewJvsVersion($item);
    }

    public function removeImage ($id, $type) {
        $jvsQry = Tbljvs::find($id);
        $sign = "";
        if($type == "preparedBy"){
            $sign = $jvsQry->jvs_prepared;
        }

        if ($type == "approvedBy"){
            $sign = $jvsQry->jvs_approved;
        }
        
        try {
            $arrayHolder = empty($sign) ? null : explode("|", $sign);
            $path = "";
            if($type == "preparedBy"){
                $path = public_path('storage/jvscrw/prepared/'.$arrayHolder[2]);
                $jvsQry->jvs_prepared = $arrayHolder[0]. "|" . $arrayHolder[1] . "|";
            }
    
            if ($type == "approvedBy"){
                $path = public_path('storage/jvscrw/approved/'.$arrayHolder[2]);
                $jvsQry->jvs_approved = $arrayHolder[0]. "|" . $arrayHolder[1] . "|";;
            }
            unlink($path);
            $jvsQry->save();
            
            return response()->json([
                "message" => "Deleted"
            ], 200);
         
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Failed to delete image, try again later"
            ], 400);
        }
    }

    public function saveSignaturesAndName(Request $request) {
        return $this->appService->saveSignaturesAndName($request);
    }

    public function getEmployeeAsOption($plantillaId){
        
        $plantillaQuery = TblplantillaItems::find($plantillaId);
        $findPlantillaWithOffice = TblplantillaItems::where('itm_ofc_id',$plantillaQuery->itm_ofc_id)->where('itm_state', 1)->with('employee')->get();
        $optionHolder = [];
   
        foreach ($findPlantillaWithOffice as $value) {
            array_push($optionHolder, $value->employee);
        }

        return CommonResource::collection($optionHolder);
    }
}
