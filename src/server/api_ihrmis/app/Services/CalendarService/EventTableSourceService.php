<?php

namespace App\Services\CalendarService;

use App\Models\Applicants\Tblapplicants;

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

    private function applicant($arrayHolder){
    
        $outputArray = Tblapplicants::whereIn("app_id", $arrayHolder)->with("employee", "plantillaItems.tblpositions", "plantillaItems.tbloffices")->get();
        return $outputArray;
    }
}