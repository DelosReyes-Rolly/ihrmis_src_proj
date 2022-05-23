<?php

namespace App\Http\Resources\Jvscrw;

use App\Models\Employees\Tblagencies;
use App\Models\TblplantillaItems;
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
        $plantilla = TblplantillaItems::where('itm_id', $this->itm_supv1_itm_id)->with('tblpositions')->first();
        $agency = Tblagencies::where('agn_id', $this->tbloffices->ofc_agn_id)->first();
        return [
            'itm_no' => $this->itm_no,
            'report_to' => $plantilla->tblpositions->pos_title ?? null,
            'agency' => $agency->$agency ?? null,
            'jvs' => JvsCrwResource::collection($this->whenLoaded('tbljvs')),
            'office' => new JvsOfficeResource($this->whenLoaded('tbloffices')),
            'position' => new JvsPositionResource($this->whenLoaded('tblpositions')),
        ];
    }
}
