<?php

namespace App\Http\Resources\Plantilla;

use App\Services\CommonHelpers;
use Illuminate\Http\Resources\Json\JsonResource;

class GetPositionWithCscResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $helper = new CommonHelpers();
        $csc_standard = $helper->cscStandardFormatter($this->tblpositionCscStandards);

        return [
            "pos_id" => $this->pos_id,
            "pos_title" => $this->pos_title,
            "pos_short_name" => $this->pos_short_name,
            "pos_salary_grade" => $this->pos_salary_grade,
            "pos_category" => $this->pos_category,
            "education" => $csc_standard["ed"] ?? "",
            "experience" => $csc_standard["ex"] ?? "",
            "training" => $csc_standard["tr"]  ?? "",
            "eligibility" => $csc_standard["cs"] ?? ""
        ];
    }
}


// $arrContainer = [];

// $IligibilityHolder = [
//     "No Eligibility", 
//     "Professional", 
//     "Sub-professional", 
//     "Board / Bar",
//     "Barangay Health Worker",
//     "Barangay Official",
//     "Barangay Nutrition Scholar",
//     "Electronic Data Processing Specialist (EDPS)",
//     "Honor Graduate",
//     "Foreign School Honor Graduate",
//     "Scientific and Technological Specialist",
//     "Veteran Preference Rating",
//     "Sanggunian Member",
//     "Skill Eligibility",
// ];

// $EducType = ['Elementary', 'Secondary', 'Vocational/Trade', 'College', 'Graduate Studies'];
// foreach ($this->tblpositionCscStandards as $value) {
//     if($value["std_type"] == "ED"){
//         $degree = explode("|",$value['std_keyword']);
//         $printArr = [];
//         foreach($degree as $educValue){
//             $holder = explode(":",$educValue);
//             if($EducType[$holder[0] - 1] == $EducType[0] || $EducType[$holder[0] - 1] == $EducType[1]){
//                 array_push($printArr, $EducType[$holder[0] - 1] . " is relevant to the job");
//             }
//             if($EducType[$holder[0] - 1] == $EducType[2]){
//                 array_push($printArr, $EducType[$holder[0] - 1] . " in " . $holder[1] . " is relevant to the job");
//             }
//             if($EducType[$holder[0] - 1] == $EducType[3]){
//                 array_push($printArr, $EducType[$holder[0] - 1] . " Degree in " . $holder[1] . " is relevant to the job");
//             }
//             if($EducType[$holder[0] - 1] == $EducType[4]){
//                 array_push($printArr, $EducType[$holder[0] - 1] . " in " . $holder[1] . " is relevant to the job");
//             }
//         }

//         if(!empty($value["std_specifics"])){
//             $arrContainer["ed"] = implode(", ", $printArr) . " and or " . $value["std_specifics"];
//         } else {
//             $arrContainer["ed"] = implode(", ", $printArr) . ".";
//         }   
//     } else if ($value["std_type"] == "EX") {
//         $arrContainer["ex"] =  $value["std_quantity"] . " years of " . $value["std_keyword"] . " Experience";
//     } else if ($value["std_type"] == "TR") {
//         $arrContainer["tr"] = $value["std_quantity"] . " hours of " . $value["std_keyword"];
//     } else if ($value["std_type"] == "CS") {
//         $reArange = explode("|", $value["std_keyword"]);
//         $eligibililityValue = [];
//         foreach ($reArange as $value) {
//             array_push($eligibililityValue, $IligibilityHolder[$value]);
//         }
//         $arrContainer["cs"] = implode(" / ", $eligibililityValue);
//     }
// }
