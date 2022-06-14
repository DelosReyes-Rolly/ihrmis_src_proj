<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeTrainingResource extends JsonResource
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
            "trn_id" => $this->trn_id,
            "trn_app_id" => $this->trn_emp_id,
            "trn_app_title" => $this->trn_emp_title,
            "trn_app_from" => $this->trn_emp_from,
            "trn_app_to" => $this->trn_emp_to,
            "trn_app_hours" => $this->trn_emp_hours,
            "trn_app_type" => $this->trn_emp_type,
            "trn_app_sponsor" => $this->trn_emp_sponsor,
            "trn_app_cmptncy" => $this->trn_emp_cmptncy
        ];
    }
}
