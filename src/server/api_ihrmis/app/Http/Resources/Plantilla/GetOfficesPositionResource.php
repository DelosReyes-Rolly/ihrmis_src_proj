<?php

namespace App\Http\Resources\Plantilla;

use Illuminate\Http\Resources\Json\JsonResource;

class GetOfficesPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
        // return [
        //     'offices' => [$this->pos_title], #collection 
        //     'positions' => [$this->ofc_name], #collection
        // ];
    }
}
