<?php

namespace App\Http\Resources\Jvscrw;

use Illuminate\Http\Resources\Json\JsonResource;

class JvsOfficeResource extends JsonResource
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
            'ofc_name' => $this->ofc_name,
            'office_head'=> $this->ofc_head_itm_id,
        ];
    }
}
