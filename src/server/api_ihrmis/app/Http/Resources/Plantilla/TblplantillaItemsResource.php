<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\TblofficesResource;
use App\Http\Resources\TblpositionsResource;
use App\Models\TblplantillaItems;
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
        $plantilla_sup1 = TblplantillaItems::where('itm_id', $this->itm_supv1_itm_id)->value('itm_no');
        $plantilla_sup2 = TblplantillaItems::where('itm_id', $this->itm_supv2_itm_id)->value('itm_no');

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
            'itm_supv1_itm_id' => $this->itm_supv1_itm_id,
            'itm_supv2_itm_id' => $this->itm_supv2_itm_id,
            'itm_supv1_display'=> $plantilla_sup1,
            'itm_supv2_display'=>$plantilla_sup2,
            //RELATIONSHIP
            'position' => new TblpositionsResource($this->tblpositions),
            'office' => new TblofficesResource($this->tbloffices),
        ];
    }
}
