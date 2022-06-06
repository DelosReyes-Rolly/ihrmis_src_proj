<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeVoluntaryResource extends JsonResource
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
            "vol_id" => $this->vol_id,
            "vol_app_id" => $this->vol_emp_id,
            "vol_app_org" => $this->vol_emp_org,
            "vol_app_addr" => $this->vol_emp_addr,
            "vol_app_from" => $this->vol_emp_from,
            "vol_app_to" => $this->vol_emp_to,
            "vol_app_hours" => $this->vol_emp_hours,
            "vol_app_work" => $this->vol_emp_work,
        ];
    }
}
