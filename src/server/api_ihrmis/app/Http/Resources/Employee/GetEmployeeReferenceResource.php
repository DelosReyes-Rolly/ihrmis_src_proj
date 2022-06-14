<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeReferenceResource extends JsonResource
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
            "ref_id" => $this->ref_id,
            "ref_app_id" => $this->ref_emp_id,
            "ref_app_name" => $this->ref_emp_name,
            "ref_app_email" => $this->ref_emp_email,
            "ref_app_addr" => $this->ref_emp_addr,
            "ref_app_tel_no" => $this->ref_emp_tel_no
        ];
    }
}
