<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\CommonResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GetPlantillaItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $arrData = $this->tblpositions->tblpositionCscStandards;
        $csc = [];
        $education = [];
        $training = [];
        $experience = [];

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

        foreach ($arrData as $value) {
            if ($value['std_type'] == "CS") {
                $cscArr = [];
                if ($value->std_keyword) {
                }
                $varExp = explode("|", $value->std_keyword);
                foreach ($varExp as $cscData) {
                    array_push($cscArr, ["value" => $cscData, "label" => $IligibilityHolder[$cscData]]);
                }
                $csc = [
                    "std_quantity" => $value->std_quantity,
                    "std_keyword" => $cscArr,
                    "std_specifics" => $value->std_specifics
                ];
            } else if ($value['std_type'] == "ED") { // EDUCATION
                $dualValue = explode("|", $value->std_keyword);
                $arrayHolder = [];
                foreach ($dualValue as $valueTwo) {
                    array_push($arrayHolder, explode(":", $valueTwo));
                }
                // return $arrayHolder;
                $array = [];
                foreach ($arrayHolder as $valueThree) {
                    array_push($array, ["level" => $valueThree[0], "keyword" => $valueThree[1]]);
                }

                $education = [
                    "std_quantity" => $value->std_quantity,
                    "std_keyword" => $array,
                    "std_specifics" => $value->std_specifics
                ];
            } else if ($value['std_type'] == "TR") {
                $training = $value;
            } else if ($value['std_type'] == "EX") {
                $experience = $value;
            }
        }

        return [

            'itm_id' => $this->itm_id,
            'itm_no' => $this->itm_no,
            'itm_regular' => $this->itm_regular,
            'itm_status' => $this->itm_status,
            'itm_level' => $this->itm_level,
            'itm_function' => $this->itm_function,
            'itm_basis' => $this->itm_basis,
            'itm_category' => $this->itm_category,
            'itm_creation' => $this->itm_creation,
            'itm_state' => $this->itm_state,
            'pos_title' => $this->tblpositions->pos_title,
            'pos_category' => $this->tblpositions->pos_category,
            'office' => new CommonResource($this->tbloffices),
            "pos_short_name" => $this->pos_short_name,
            "pos_salary_grade" => $this->pos_salary_grade,
            "pos_category" => $this->pos_category,
            "csc" => $csc,
            "education" => $education,
            "training" => $training,
            "experience" => $experience,
            "dutiesandresponsibilities" => new CommonResource($this->tbldtyresponsibility)
        ];
    }
}
