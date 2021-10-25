<?php

namespace App\Http\Resources;

use App\Models\TblplantillaItems;
use Illuminate\Http\Resources\Json\JsonResource;

class TblpositionsResource extends JsonResource
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
            "pos_short_name" => $this->pos_short_name
        ];
    }
}
