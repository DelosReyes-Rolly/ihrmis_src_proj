<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeCseEligibilityResource extends JsonResource
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
            'cse_id' => $this->cse_id,
            'cse_app_id' => $this->cse_emp_id,
            'cse_app_title' => $this->cse_emp_title,
            'cse_app_date' => $this->cse_emp_date,
            'cse_app_place' => $this->cse_emp_place,
            'cse_app_rating' => $this->cse_emp_rating,
            'cse_app_license' => $this->cse_emp_license,
            'cse_app_validity' => $this->cse_emp_validity,
        ];
    }
}
