<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class TblofficesResource extends JsonResource
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
            'ofc_id' => $this->ofc_id,
            'ofc_acronym' => $this->ofc_acronym,
            'ofc_area_code' => $this->ofc_area_code,
            'ofc_area_type' => $this->ofc_area_type
        ];
    }
}
