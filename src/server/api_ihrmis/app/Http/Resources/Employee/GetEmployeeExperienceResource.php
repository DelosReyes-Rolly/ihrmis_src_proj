<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeExperienceResource extends JsonResource
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
            'exp_id' => $this->exp_id,
            'exp_app_id' => $this->exp_emp_id,
            'exp_app_from' => $this->exp_emp_from,
            'exp_app_to' => $this->exp_emp_to,
            'exp_app_position' => $this->exp_emp_position,
            'exp_app_agency' => $this->exp_emp_agency,
            'exp_app_salary' => $this->exp_emp_salary,
            'exp_app_grade' => $this->exp_emp_grade,
            'exp_app_step' => $this->exp_emp_step,
            'exp_app_appntmnt' => $this->exp_emp_appntmnt,
            'exp_app_govt' => $this->exp_emp_govt,
            'exp_app_rel_fields' => $this->exp_emp_rel_fields,
        ];
    }
}
