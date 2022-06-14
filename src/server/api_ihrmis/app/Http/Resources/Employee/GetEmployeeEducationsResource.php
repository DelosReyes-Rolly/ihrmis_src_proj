<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeEducationsResource extends JsonResource
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
        'edu_id' => $this->edu_id,
        'edu_app_id' => $this->edu_emp_id,
        'edu_app_level' => $this->edu_emp_level,
        'edu_app_school' => $this->edu_emp_school,
        'edu_app_from' => $this->edu_emp_from,
        'edu_app_to' => $this->edu_emp_to,
        'edu_app_degree' => $this->edu_emp_degree,
        'edu_app_graduated' => $this->edu_emp_graduated,
        'edu_app_units' => $this->edu_emp_units,
        'edu_app_honors' => $this->edu_emp_honors,
        ];
    }
}
