<?php

namespace App\Http\Resources\Jvscrw;

use App\Services\CommonHelpers;
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

        $helper = new CommonHelpers();
        $csc_standard = $helper->cscStandardFormatter($this->tblpositionCscStandards);
        
        return [
            'title' => $this->pos_title,
            'salary_grade' => $this->pos_salary_grade,
            "education" => $csc_standard['ed'] ?? [],
            "experience" => $csc_standard['ex'] ?? [],
            "eligibility" => $csc_standard['cs'] ?? [],
            "training" => $csc_standard['tr'] ?? [],
        ];
    }
}
