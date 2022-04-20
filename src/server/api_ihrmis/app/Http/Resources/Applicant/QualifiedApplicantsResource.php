<?php

namespace App\Http\Resources\Applicant;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class QualifiedApplicantsResource extends JsonResource
{
    /**
     * Get All qualified Applicants and Attach Message for Front end.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $civil_statuses = [
            "SG" => "Single",
            "MR" => "Married",
            "WD" => "Widowed",
            "SP" => "Seperated",
            "OT" => "Others",
        ];

        $eligibility = [
            0 => "No Eligibility",
            1 => "Professional",
            2 => "Sub-professional",
            3 => "Board / Bar",
            4 => "Barangay Health Worker",
            5 => "Barangay Official",
            6 => "Barangay Nutrition Scholar",
            7 => "Electronic Data Processing Specialist (EDPS)",
            8 => "Honor Graduate",
            9 => "Foreign School Honor Graduate",
            10 => "Scientific and Technological Specialist",
            11 => "Veteran Preference Rating",
            12 => "Sanggunian Member",
            13 => "Skill Eligibility",
        ];

        $education = [
            0 => "N/A",
            1 => "Bachelor's",
            2 => "Master's",
            3 => "PhD",
        ];


        $age = Carbon::parse($this->TblapplicantsProfile->app_birth_date)->age;
        $civil_status = $civil_statuses[$this->TblapplicantsProfile->app_civil_status];
        $email = $this->TblapplicantsProfile->app_email_addr;
        $number = $this->TblapplicantsProfile->app_mobile_no;
        $profile_message = $age . " Years Old; " . $civil_status . ";\n" . $email . ";\n" . $number;

        /**
         * Loop through  and Trainings to get Highest
         */
        $highest['training_hours'] = 0;
        $highest['training'] = "";
        foreach ($this->tblapplicantTrainings as $appTrainings) {
            $competencies = explode(',', $appTrainings->trn_app_cmptncy);
            foreach ($competencies as $competency) {
                $current = $appTrainings->trn_app_hours;
                if ($current > $highest['training_hours']) {
                    $highest['training_hours'] = $current;
                    $highest['training'] = $competency;
                }
            }
        }
        $highest['education_level'] = 0;
        $highest['education'] = "";
        foreach ($this->tblapplicantEducation as $appEducation) {
            $current = $appEducation->edu_app_level;
            if ($current > $highest['education_level']) {
                $highest['education_level'] = $current;
                $highest['education_text'] = $education[$current];

                $highest['education'] = $appEducation->edu_app_degree;
            }
        }
        $highest['eligibility_id'] = 0;
        $highest['eligibility'] = "";
        foreach ($this->tblapplicantEligibility as $appEligibility) {
            $current = $appEligibility->cse_app_title;
            if ($current > $highest['eligibility_id']) {
                $highest['eligibility_id'] = $current;
                $highest['eligibility'] = $eligibility[$current];
            }
        }

        $highest['experience_years'] = 0;
        $highest['experience'] = "";
        foreach ($this->tblapplicantExperience as $appExperience) {
            $applicantExpField = [];
            $start = new Carbon($appExperience->exp_app_from, 'Asia/Manila');
            $end = new Carbon($appExperience->exp_app_to, 'Asia/Manila');
            $related_fields = explode(',', $appExperience->exp_app_rel_fields);
            foreach ($related_fields as $field) {
                $applicantExpField[$field]['field'] = $field;
                if (empty($applicantExpField[$field]['years'])) {
                    $applicantExpField[$field]['years'] = $start->diffInYears($end, true);
                } else {
                    $applicantExpField[$field]['years'] += $start->diffInYears($end, true);
                }
                $current = $applicantExpField[$field]['years'] += $start->diffInYears($end, true);
                if ($current > $highest['experience_years']) {
                    $highest['experience_years'] = $current;
                    $highest['experience'] = $field;
                }
            }
        }

        $qualification_message = $highest['education_text'] . " in " . $highest['education'] . ";\n" .
            $highest['experience_years'] . " years experience in " . $highest['experience'] . ";\n". $highest['training_hours'] . " hours training in " .
            $highest['training'] . "; " . $highest['eligibility'] . "";

        return [
            'app_id' => $this->app_id,
            'tblapplicant_eligibility' => $this->tblapplicantEligibility,
            'tblapplicant_education' => $this->tblapplicantEducation,
            'tblapplicant_experience' => $this->tblapplicantExperience,
            'tblapplicant_trainings' => $this->tblapplicantTrainings,
            'tblapplicants_profile' => $this->TblapplicantsProfile,
            'tblplantilla_items' => $this->TblplantillaItems,
            'tblpositions' => $this->TblPositions,
            'tbloffices' => $this->Tbloffices,
            'profile_message' => $profile_message,
            'qualification_message' => $qualification_message
        ];
    }
}
