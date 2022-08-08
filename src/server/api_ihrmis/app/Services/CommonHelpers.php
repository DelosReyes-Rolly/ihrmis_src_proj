<?php

namespace App\Services;

class CommonHelpers
{

    public function response($result, $status = 500, $message = "Unsuccessfully"){
        return response()->json([
            "message" => $message,
            "result" => $result
        ], $status);
    }

    public function cscStandardFormatter($data){
        $IligibilityHolder = $this->typeCscEligibility;

        $arrContainer = [];
        $EducType = ['Elementary', 'Secondary', 'Vocational/Trade', 'Bachelor\'s', 'Master\'s', 'PhD\'s'];
        foreach ($data as $value){
            if($value["std_type"] == "ED"){
                $degree = explode("|",$value['std_keyword']);
                $printArr = [];
                foreach($degree as $educValue){
                    $holder = explode(":",$educValue);
                    array_push($printArr, $EducType[$holder[0] - 1] . " degree relevant to the job");
                    // if($EducType[$holder[0] - 1] == $EducType[0] || $EducType[$holder[0] - 1] == $EducType[1]){
                    //     array_push($printArr, $EducType[$holder[0] - 1] . " is relevant to the job");
                    // }
                    // if($EducType[$holder[0] - 1] == $EducType[2]){
                    //     array_push($printArr, $EducType[$holder[0] - 1] . " in " . $holder[1] . " is relevant to the job");
                    // }
                    // if($EducType[$holder[0] - 1] == $EducType[3]){
                    //     array_push($printArr, $EducType[$holder[0] - 1] . " Degree in " . $holder[1] . " is relevant to the job");
                    // }
                    // if($EducType[$holder[0] - 1] == $EducType[4]){
                    //     array_push($printArr, $EducType[$holder[0] - 1] . " in " . $holder[1] . " is relevant to the job");
                    // }
                }

                // if(!empty($value["std_specifics"])){
                //     $arrContainer["ed"] = implode(", ", $printArr) . " and or " . $value["std_specifics"];
                // } else {
                    $arrContainer["ed"] = implode(", ", $printArr) . ".";
                // } 
            } else if ($value["std_type"] == "EX") {
                $arrContainer["ex"] =  $value["std_quantity"] . " years of " . $value["std_keyword"] . " Experience";
            } else if ($value["std_type"] == "TR") {
                $arrContainer["tr"] = $value["std_quantity"] . " hours of " . $value["std_keyword"];
            } else if ($value["std_type"] == "CS") {
                $reArange = explode("|", $value["std_keyword"]);
                $eligibililityValue = [];
                foreach ($reArange as $value) {
                    array_push($eligibililityValue, $IligibilityHolder[$value]);
                }
                $arrContainer["cs"] = implode(" / ", $eligibililityValue);
            }
        }

        return $arrContainer;
    }

    private $typeCscEligibility = [
        "No Eligibility",
        "Professional",
        "Sub-professional",
        "Board / Bar",
        "Barangay Health Worker",
        "Barangay Official",
        "Barangay Nutrition Scholar",
        "Electronic Data Processing Specialist (EDPS)",
        "Honor Graduate",
        "Foreign School Honor Graduate",
        "Scientific and Technological Specialist",
        "Veteran Preference Rating",
        "Sanggunian Member",
        "Skill Eligibility",
    ];
}
