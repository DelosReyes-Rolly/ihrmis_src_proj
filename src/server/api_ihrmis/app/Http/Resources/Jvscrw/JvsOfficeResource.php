<?php

namespace App\Http\Resources\Jvscrw;

use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
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
        $plantilla = TblplantillaItems::where('itm_id', $this->ofc_head_itm_id)->with('tblpositions')->first();
        $headOffice = Tbloffices::where('ofc_id', $this->ofc_ofc_id)->first();
        return [
            'ofc_name' => $this->ofc_name,
            'ofc_head'=> $plantilla->tblpositions->pos_title ?? null,
            'ofc_head_ofc' => $headOffice->ofc_name ?? null,
        ];
    }
}
