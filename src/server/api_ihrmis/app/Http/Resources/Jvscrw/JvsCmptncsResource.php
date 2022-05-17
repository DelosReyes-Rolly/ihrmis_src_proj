<?php

namespace App\Http\Resources\Jvscrw;

use Illuminate\Http\Resources\Json\JsonResource;

class JvsCmptncsResource extends JsonResource
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
            'type' => $this->com_type,
            'ratings' => $this->tblComType->where('rtg_id', $this->com_jvs_id)->where('rtg_com_type', $this->com_type)
        ];
    }
}
