<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\TblpositionsResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GetPlantillaPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $position = new TblpositionsResource($this->tblpositions);
        return [
            'itm_id' => $this->itm_id,
            'pos_title' => $position->pos_title,
        ];
    }
}
