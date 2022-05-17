<?php

namespace App\Http\Resources\Jvscrw;

use Illuminate\Http\Resources\Json\JsonResource;

class JvsCscStandardResource extends JsonResource
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
            'std_type' => $this->std_type,
            'std_quantity' => $this->std_quantity,
            'std_keyword' => $this->std_keyword,
            'std_specifics' => $this->std_specifics,
        ];
    }
}
