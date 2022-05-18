<?php

namespace App\Http\Resources\Jvscrw;

use Illuminate\Http\Resources\Json\JsonResource;

class JvsPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $IligibilityHolder = [
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

        $arrContainer = [];
        $EducType = ['Bachelor\'s', 'Master\'s', 'PhD'];
        foreach ($this->tblpositionCscStandards as $value) {
            if($value["std_type"] == "ED"){
                $degree = explode("|",$value['std_keyword']);
                $printArr = [];
                foreach($degree as $educValue){
                    $holder = explode(":",$educValue);
                    array_push($printArr, $EducType[$holder[0] - 1] . " Degree in " . $holder[1] . " is relevant to the job");
                }
                if(!empty($value["std_specifics"])){
                    $arrContainer["ed"] = implode(", ", $printArr) . " and or " . $value["std_specifics"];
                } else {
                    $arrContainer["ed"] = implode(", ", $printArr) . ".";
                }   
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
        
        return [
            'title' => $this->pos_title,
            'salary_grade' => $this->pos_salary_grade,
            'csc_standards' => [
                [
                    "std_type" => "ED",
                    "std_specifics" => $arrContainer['ed'],
                ],
                [
                    "std_type" => "EX",
                    "std_specifics" => $arrContainer['ex'],
                ],
                [
                    "std_type" => "CS",
                    "std_specifics" => $arrContainer['cs'],
                ],
                [
                    "std_type" => "TR",
                    "std_specifics" => $arrContainer['tr'],
                ]
            ]
        ];
    }
}
