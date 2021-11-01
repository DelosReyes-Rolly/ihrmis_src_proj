<?php

namespace App\Http\Resources\Applicant;

use Illuminate\Http\Resources\Json\JsonResource;

class ApplicantEducationalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'item' => $this->edu_app_idref,
            'school' => $this->edu_app_school,
            'unit_earned' => $this->edu_app_units,
            'level' => $this->edu_app_level,
            'to' => $this->edu_app_from,
            'from' => $this->edu_app_to,
            'degree' => $this->edu_app_degree,
            'graduated' => $this->edu_app_graduated,
            'honors' => $this->edu_app_honors
        ];
    }
}
