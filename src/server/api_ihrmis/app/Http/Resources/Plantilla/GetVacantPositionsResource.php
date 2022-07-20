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
            'itm_state' => $this->itm_state,
            'is_notify' => $this->is_notify,
            'date_submitted' => $this->date_submitted,
            'deadline' => $this->deadline,
            'pos_title' => $this->tblpositions->pos_title,
            'pos_category' => $this->tblpositions->pos_category,
            'office' => new CommonResource($this->tbloffices)
        ];
    }
}
