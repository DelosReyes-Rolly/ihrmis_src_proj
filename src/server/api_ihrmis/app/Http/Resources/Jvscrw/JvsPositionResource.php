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
        return [
            
            'title' => $this->pos_title,
            'salary_grade' => $this->pos_salary_grade,
            'csc_standards' => JvsCscStandardResource::collection($this->tblpositionCscStandards)
        ];
    }
}
