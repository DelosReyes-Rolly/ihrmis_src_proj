<?php

namespace App\Services\CalendarService;

use App\Models\Applicants\Tblapplicants;
use App\Models\Calendar\TblcalendarEvent;

class EventTableSourceService {

    public $tableList = [
        "tblapplicant"
    ];

    public function eventTableSelectorQry($source){
        // return $source; 
        $convertedArray = explode("|", $source);
        $arrayHolder = [];
        foreach ($convertedArray as $key => $value) {
            if($key > 0) array_push($arrayHolder, $value);
        }
        // return $arrayHolder;
        if($convertedArray[0] == $this->tableList[0]) return $this->applicant($arrayHolder);
        // Add if statement here
    }

    public function selectedAppointeesMarkAsFinished($request) {
        if($request->schedule != null){
            $qryArray = TblcalendarEvent::where('evn_id', $request->schedule)->first();
            $qryArray->evn_is_done = 1;
            $this->modifyOnboardingProcessApplicant($qryArray->evn_source);
            $qryArray->save();
            return "Appointees is now onboarded!";   
        }

        if(!empty($request->appointees)){
            foreach ($request->appointees as $value) {
                $qry = Tblapplicants::where("app_id", $value)->first();
                $qry->app_onboarding_process = 2;
                $qry->save();
            }
            return "Appointees is now onboarded!";
        }
    }


    /**
     * PRIVATE FUNCTIONS
     */

    private function applicant($arrayHolder){
        // used in evenTableSelectorQry
        $outputArray = Tblapplicants::whereIn("app_id", $arrayHolder)->where("app_onboarding_process", 1)->with("employee", "plantillaItems.tblpositions", "plantillaItems.tbloffices")->get();
        return $outputArray ?? [];
    }

    private function modifyOnboardingProcessApplicant($item) {
        $convertedArray = explode("|", $item);
        $arrayHolder = [];
        foreach ($convertedArray as $key => $value) {
            if($key > 0) array_push($arrayHolder, $value);
        }

        foreach ($arrayHolder as $value) {
            $outputArray = Tblapplicants::where("app_id", $value)->first();
            $outputArray->app_onboarding_process = 2;
            $outputArray->save();
        }

    }
}