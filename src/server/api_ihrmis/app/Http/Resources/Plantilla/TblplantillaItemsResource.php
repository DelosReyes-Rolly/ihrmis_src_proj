<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\TblofficesResource;
use App\Http\Resources\TblpositionsResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TblplantillaItemsResource extends JsonResource
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
            //RELATIONSHIP
            'position' => new TblpositionsResource($this->tblpositions),
            'office' => new TblofficesResource($this->tbloffices),
        ];
    }
}
