<?php

namespace App\Http\Resources\Plantilla;

use App\Services\CommonHelpers;
use Illuminate\Http\Resources\Json\JsonResource;

class GetCscRequirementsResource extends JsonResource
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

        return  [
            "education" => $csc_standard["ed"] ?? "",
            "experience" => $csc_standard["ex"] ?? "",
            "training" => $csc_standard["tr"]  ?? "",
            "eligibility" => $csc_standard["cs"] ?? ""
        ];
    }
}
