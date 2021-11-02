<?php

namespace App\Http\Resources\Applicant;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicantExperienceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        
        $startDate = Carbon::parse($this->exp_app_from);
        $endDate = Carbon::parse($this->exp_app_to);
        $enclusiveDate = $startDate->diffInYears($endDate, false);
        return [
            'exp_app_time' => $this->exp_app_time,
            'exp_app_id' => $this->exp_app_id,
            'enclusive' => $enclusiveDate,
            'exp_app_from' => $this->exp_app_from,
            'exp_app_to' => $this->exp_app_to,
            'exp_app_position' => $this->exp_app_position,
            'exp_app_agency' => $this->exp_app_agency,
            'exp_app_salary' => $this->exp_app_salary,
            'exp_app_grade' => $this->exp_app_grade,
            'exp_app_step' => $this->exp_app_step,
            'exp_app_appntmnt' => $this->exp_app_appntmnt,
            'exp_app_govt' => $this->exp_app_govt,
            'exp_app_rel_fields' => $this->exp_app_rel_fields,
        ];
    }
}
