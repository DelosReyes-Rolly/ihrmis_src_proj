<?php

namespace App\Http\Resources\Jvscrw;

use Illuminate\Http\Resources\Json\JsonResource;

class JvsCrwResource extends JsonResource
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
            'prepared' => $this->jvs_prepared,
            'approved' => $this->jvs_approved,
            'signed_file' => $this->jvs_signed_file,
            // 'dts_rspnsblty' => $this->tbljvsDutiesRes
            'competencies' => $this->tbljvsCompentencies,
        ];
    }
}
