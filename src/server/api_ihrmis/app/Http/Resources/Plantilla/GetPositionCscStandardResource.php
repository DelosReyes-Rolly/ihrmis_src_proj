<?php

namespace App\Http\Resources\Plantilla;

use Illuminate\Http\Resources\Json\JsonResource;
use stdClass;

class GetPositionCscStandardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $arrData = $this->tblpositionCscStandards;
        $csc = [];
        $education = [];
        $training = [];
        $experience = [];

        foreach ($arrData as $value) {
            if ($value['std_type'] == "CS"){
                $cscArr = [];
                if($value->std_keyword ){

                }
                $varExp = explode("|", $value->std_keyword);
                foreach ($varExp as $cscData) {
                    array_push($cscArr, ["value" => $cscData, "label" => $cscData]);
                }
                $csc = [
                    "std_quantity" => $value->std_quantity,
                    "std_keyword" => $cscArr,
                    "std_specifics" => $value->std_specifics
                ];
            } else if ($value['std_type'] == "ED"){ // EDUCATION
                $dualValue = explode("|", $value->std_keyword);
                $arrayHolder = [];
                foreach ($dualValue as $valueTwo) {
                    array_push($arrayHolder, explode(":", $valueTwo)) ;
                }
                // return $arrayHolder;
                $array = [];
                foreach($arrayHolder as $valueThree){
                    array_push($array,[ "level" => $valueThree[0], "keyword" => $valueThree[1]]);
                }

                $education = [
                    "std_quantity" => $value->std_quantity,
                    "std_keyword" => $array,
                    "std_specifics" => $value->std_specifics
                ];

            } else if ($value['std_type'] == "TR"){
                $training = $value;
            } else if ($value['std_type'] == "EX"){
                $experience = $value;
            }
        }

        return [
            "pos_id" => $this->pos_id,
            "pos_title" => $this->pos_title,
            "pos_short_name" => $this->pos_short_name,
            "pos_salary_grade" => $this->pos_salary_grade,
            "pos_category" => $this->pos_category,
            "csc" => $csc,
            "education" => $education,
            "training" => $training,
            "experience" => $experience,
        ];
    }
}
