<?php

namespace App\Http\Resources\Plantilla;

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
        $arrContainer = [];
        foreach ($this->tblpositionCscStandards as $value) {
            if($value["std_type"] == "ED"){
        
                $arrContainer["ed"] = "educ";
            } else if ($value["std_type"] == "EX") {
                $arrContainer["ex"] =  $value["std_quantity"] . " years of " . $value["std_keyword"] . " Experience";
            } else if ($value["std_type"] == "TR") {
                $arrContainer["tr"] = $value["std_quantity"] . " hours of " . $value["std_keyword"];
            } else if ($value["std_type"] == "CS") {
                $reArange = explode("|", $value["std_keyword"]);
                $arrContainer["cs"] = implode(" / ",$reArange);
            }
        }

        return [
            "pos_title" => $this->pos_title,
            "pos_short_name" => $this->pos_short_name,
            "pos_salary_grade" => $this->pos_salary_grade,
            "education" => $this->pos_title ?? "",
            "experience" => $arrContainer["ex"] ?? "",
            "training" => $arrContainer["tr"]  ?? "",
            "eligibility" => $arrContainer["cs"] ?? ""
        ];
    }
}
