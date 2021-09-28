<?php

namespace App\Http\Resources\Jvscrw;

use Illuminate\Http\Resources\Json\JsonResource;

class JvscrwMainResources extends JsonResource
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
            'itm_no' => $this->itm_no,
            'jvs' => new JvsCrwResource($this->whenLoaded('tbljvs')),
            'office' => new JvsOfficeResource($this->whenLoaded('tbloffices')),
            'position' => new JvsPositionResource($this->whenLoaded('tblpositions')),
        ];
    }
}
