<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Onboarding\NewAppointeesResource;
use App\Http\Resources\Onboarding\OnboardingScheduleResource;
use App\Models\Applicants\Tblapplicants;
use App\Models\Tblattachments;
use App\Models\TblcalendarEvent;
use App\Models\TblonboardingSectionItems;
use App\Models\TblonboardingSections;
use App\Services\CalendarService\EventTableSourceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Nette\Utils\Json;

class OnboardingController extends Controller{

    protected $service;

    public function __construct(EventTableSourceService $serviceMethods)
    {
        $this->service = $serviceMethods;
    }

    public function getOnboardingSections(){
        $qry = TblonboardingSections::orderBy('sec_onb_order', 'ASC')->get();
        return CommonResource::collection($qry);
    }

    public function addOnboardingSections(Request $request){
        try {
            $qry = TblonboardingSections::get(); $value = 0;
            foreach ($qry as $item) {
                if($item->sec_onb_order > $value) $value = $item->sec_onb_order;
            }
            $qryAdd = new TblonboardingSections();
            $qryAdd->sec_onb_order = $value + 1;
            $qryAdd->sec_onb_name = $request->sec_onb_name;
            $qryAdd->save();

            $returningValue = TblonboardingSections::get();
            return CommonResource::collection($returningValue);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function updateOnboardingSections(Request $request){
        try {
            foreach ($request->item as $key => $value) {
                $qryUpdate = TblonboardingSections::where('sec_onb_id', $value["sec_onb_id"])->first();
                $qryUpdate->sec_onb_order = $key + 1;
                $qryUpdate->save();
            }
            return response()->json([
                'message' => "Successfully Modified order"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function removeOnboardingSections($secId){
        try {
            TblonboardingSections::where('sec_onb_id', $secId)->delete();
            TblonboardingSectionItems::where('itm_sec_onb_id', $secId)->delete();
            $qrySecs = TblonboardingSections::orderBy('sec_onb_order', 'ASC')->get();
            return CommonResource::collection($qrySecs);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function getSectionItemBySectionId($secId) {
        $qry = TblonboardingSectionItems::where('itm_sec_onb_id', $secId)->orderBy('itm_onb_order', 'ASC')->get();
        return CommonResource::collection($qry);
    }

    public function addSectionItemBySectionId(Request $request) {

        $value = 0;
        $qry = TblonboardingSectionItems::where('itm_sec_onb_id', $request->itm_sec_onb_id)->get(); 
        foreach ($qry as $item) {
            if($item->itm_onb_order > $value) $value = $item->itm_onb_order;
        }
        
        $qry = new TblonboardingSectionItems();
        $qry->itm_sec_onb_id = $request->itm_sec_onb_id;
        $qry->itm_onb_order = $value + 1;
        $qry->itm_onb_name = $request->itm_onb_name;
        $qry->itm_onb_url = $request->itm_onb_url;
        $qry->itm_onb_content = $request->itm_onb_content;
        $qry->save();
        
        // File Hnalder
        $arrFiles = [];
        if (!empty($request->file(['files']))) {
            foreach ($request->file(['files']) as $value) {
                array_push($arrFiles, $value);
            }
        }

        if(!empty($arrFiles)){
            foreach ($arrFiles as $file) {
                $original = $file->getClientOriginalName();
                $filenameStr = $qry->itm_onb_id . "-". Carbon::now() . "-file-" . time() . "-" . $original;
                $file->storeAs('storage/onboarding/', $filenameStr);
                $attachmentQry = new Tblattachments();
                $attachmentQry->att_source = "Tblattachments|".$qry->itm_onb_id;
                $attachmentQry->att_name = $filenameStr;
                $attachmentQry->att_file = "public/onboarding/";
                $attachmentQry->save();
            }
        }

        return response()->json([
            "message" => "Successfully Added"
        ], 200);
    }

    public function updateOnboardingSectionsItemOrder(Request $request){
        try {
            foreach ($request->item as $key => $value) {
                $qryUpdate = TblonboardingSectionItems::where('itm_onb_id', $value["itm_onb_id"])->first();
                $qryUpdate->itm_onb_order = $key + 1;
                $qryUpdate->save();
            }
            return response()->json([
                'message' => "Successfully Modified order"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function createScheduleForOnboarding(Request $request, $submit_type){

        try {
            if($submit_type == "edit"){

                if($request->evn_id != null){
                    $getQryEvent = TblcalendarEvent::where("evn_id", $request->evn_id)->first();
                    $sourceHolder = explode("|", $getQryEvent->evn_source);
                    $appointessHolder = [];
                    
                    foreach ($sourceHolder as $key => $value) {
                        if($key > 0){
                            if(!in_array($value, $request->appointees)){
                                array_push($appointessHolder, $value);
                            }
                        }
                    }
                   
                    if(!empty($appointessHolder)){
                        foreach ($appointessHolder as $value) {
                            $qryApp = Tblapplicants::where("app_id", $value)->first();
                            $qryApp->app_onboarding_process = 0;
                            $qryApp->save();
                        }
                    }
                 
                    $getQryEvent->evn_source = "tblapplicant|". implode("|",$request->appointees); 
                    $getQryEvent->evn_date_start = Carbon::parse($request->evn_date_start);
                    $getQryEvent->evn_date_end = Carbon::parse($request->evn_date_end);
                    $getQryEvent->evn_time_start = $request->evn_time_start;	
                    $getQryEvent->evn_time_end = $request->evn_time_end;
                    $getQryEvent->evn_month = Carbon::parse($request->evn_date_start)->format('m');

                    $getQryEvent->save();

                    return response()->json([
                        'message' => "Onboarding schedule was updated successfully."
                    ], 200);
                }
               
            }
            
            if($submit_type == "add"){
                $qryEvent = new TblcalendarEvent();
                $qryEvent->evn_source = "tblapplicant|". implode("|",$request->appointees); // Define
                $qryEvent->evn_typ_id = 2;
                $qryEvent->evn_name = $request->evn_name;
                $qryEvent->evn_url = $request->evn_url ?? "No link";
                $qryEvent->evn_date_start = Carbon::parse($request->evn_date_start);
                $qryEvent->evn_date_end = Carbon::parse($request->evn_date_end);
                $qryEvent->evn_time_start = $request->evn_time_start;	
                $qryEvent->evn_time_end = $request->evn_time_end;
                $qryEvent->evn_frequency = 0;
                $qryEvent->evn_interval = 1;
                $qryEvent->evn_month = Carbon::parse($request->evn_date_start)->format('m');
                $qryEvent->evn_week = 0;
                $qryEvent->evn_day = 0;
                $qryEvent->evn_weekday = 1;
                $qryEvent->evn_remarks = $request->evn_remarks;
                $qryEvent->evn_system = 1;
               
                
                if(!empty($request->appointees)){
                    foreach ($request->appointees as $value) {
                        $qryApp = Tblapplicants::where("app_id", $value)->first();
                        $qryApp->app_onboarding_process = 1;
                        $qryApp->save();
                    }
                }

                $qryEvent->save();

                return response()->json([
                    'message' => "New onboarding schedule was created successfully."
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => json_encode($th) 
            ], 400);
        }
        
        
       
    }

    public function getAllScheduleForOnboarding(){
        $qryArray = TblcalendarEvent::where('evn_typ_id', 2)->get();
        $arrHolder = [];
        foreach ($qryArray as $value) {
            $myDate = date_create($value->evn_date_start." ". $value->evn_time_start);
            array_push($arrHolder, [
                "evn_id" => $value->evn_id, 
                "schedule" => date_format($myDate ,"d M Y, h:i: A"),
                "appointees" => json_encode(NewAppointeesResource::collection($this->service->eventTableSelectorQry($value->evn_source)))
            ]);
        }
        return response()->json($arrHolder, 200);
    }

    public function getSelectedAppointees(Request $request){
        $outputArray = Tblapplicants::whereIn("app_id", $request->appointees)->with("employee", "plantillaItems.tblpositions", "plantillaItems.tbloffices")->get();
        return NewAppointeesResource::collection($outputArray);
    }

    public function getSingleOnboardingSchedule($id){
       
        if($id == null){
            return response()->json(["message" => "No Scedule"], 200);
        }
        
        $qry = TblcalendarEvent::where('evn_id', $id)->first();
        $arrayHolder = explode("|",  $qry->evn_source ?? "");
        $appointeesArray = [];
        foreach ($arrayHolder  as $key => $value) {
            if($key != 0){
                array_push($appointeesArray, $value);
            }
        }
        $appointeesQry = Tblapplicants::whereIn("app_id", $appointeesArray)->with("employee", "plantillaItems.tblpositions", "plantillaItems.tbloffices")->get();
        
        $output = [
            "evn_name" => $qry->evn_name,
            "evn_date_start" => $qry->evn_date_start,
            "evn_date_end" => $qry->evn_date_end,
            "evn_time_start" => $qry->evn_time_start,
            "evn_time_end" => $qry->evn_time_end,
            "evn_remarks" => $qry->evn_remarks,
            "evn_app_array" => $appointeesArray,
            "evn_appointees" => NewAppointeesResource::collection($appointeesQry),
        ];

        return response()->json($output, 200);
        
    }

    public function getOnboardingSectionsAndSectionItem(){
        $qry = TblonboardingSections::orderBy('sec_onb_order', 'ASC')->with("sectionitem")->get();
        $arrayHolder = [];
        foreach ($qry as $value) {
            $arrayContentHolder = [];
            foreach ($value->sectionitem as $item) {
                $arrayAttachmentHolder = [];
                $qryAttach = Tblattachments::where('att_source','Tblonboarding|'.$item->itm_onb_id)->get();
                foreach ($qryAttach as $key => $links) {
                    array_push($arrayAttachmentHolder, $links->att_file.$links->att_name);
                }
                array_push($arrayContentHolder,[ 
                    'itm_onb_id' => $item->itm_onb_id,
                    'itm_sec_onb_id' => $item->itm_sec_onb_id,
                    'itm_onb_order' => $item->itm_onb_order,
                    'itm_onb_name' => $item->itm_onb_name,
                    'itm_onb_url' => $item->itm_onb_url,
                    'itm_onb_content' => $item->itm_onb_content,
                    'attachments' => $arrayAttachmentHolder
                ]);
            }

            array_push($arrayHolder,[ 
                'sec_onb_id' => $value->sec_onb_id,
                'sec_onb_order' => $value->sec_onb_order,
                'sec_onb_name' => $value->sec_onb_name,
                'sectionitem' => $arrayContentHolder,
            ]);
            $arrayContentHolder = [];
        }
        

        return response()->json($arrayHolder, 200);
    }

    public function selectedAppointeesMarkAsFinished(Request $request) {

        try {
            if(!empty($request->appointees)){
                foreach ($request->appointees as $value) {
                    $qry = Tblapplicants::where("app_id", $value)->fisrt();
                    $qry->app_onboarding_process = 2;
                    $qry->save();
                }
            }
            return response()->json(["message" => "Appointees is now onboarded!"], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Failed to update the employees, try again later."], 400);
        }
        


    }
    
}
