<?php

namespace App\Http\Resources\Onboarding;

use Illuminate\Http\Resources\Json\JsonResource;

class NewAppointeesResource extends JsonResource
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
            "app_id" => $this->app_id,
            "emp_id" => $this->app_emp_id,
            "itm_id" => $this->app_itm_id,
            "name" => $this->employee->emp_nm_first." ".$this->employee->emp_nm_mid." ".$this->employee->emp_nm_last." ".$this->employee->emp_nm_extn,
            "photo" => $this->employee->profile->emp_photo ?? null,
            "position" => $this->plantillaItems->tblpositions->pos_title ?? "",
            "office" => $this->plantillaItems->tbloffices->ofc_acronym ?? "",
        ];
    }
}
