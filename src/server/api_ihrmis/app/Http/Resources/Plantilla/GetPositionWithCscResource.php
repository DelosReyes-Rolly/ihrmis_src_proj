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
