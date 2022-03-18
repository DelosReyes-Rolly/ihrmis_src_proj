<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\CommonResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GetVacantPositionsResource extends JsonResource
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
       
            'itm_id' => $this->itm_id,
            'itm_no' => $this->itm_no,
            'itm_regular' => $this->itm_regular,
            'itm_status' => $this->itm_status,
            'itm_level' => $this->itm_level,
            'itm_function' => $this->itm_function,
            'itm_basis' => $this->itm_basis,
            'itm_category' => $this->itm_category,
            'itm_creation' => $this->itm_creation,
            
            //RELATIONSHIP
            'position_title' => $this->tblpositions['pos_title'],
            'office_name' => $this->tbloffices['ofc_name'],
            'position' => new CommonResource($this->tblpositions),
            'office' => new CommonResource($this->tbloffices),
            
        ];
    }

    
}
