<?php

namespace App\Http\Controllers\Recruitment;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\QualifiedApplicantsResource;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantsAssessments;
use App\Services\Recruitment\RecruitmentService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RecruitmentController extends Controller
{

    protected $recruitmentSerivce;

    public function __construct(RecruitmentService $serivce)
    {
        $this->recruitmentSerivce = $serivce;
    }
    public function getCompleteApplicantsProfile($type)
    {
        $qualified_applicants = $this->recruitmentSerivce->getQualifiedApplicants($type);
        // return $qualified_applicants;
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
            1 => "Elementary",
            2 => "Secondary",
            3 => "Vocational/Trade",
            4 => "Bachelor's",
            5 => "Doctorate",
        ];
        $applicants = [];
        if (isset($qualified_applicants[0])) {
            foreach ($qualified_applicants as $applicant) {
                $data = $applicant[0];
                $age = Carbon::parse($data->TblapplicantsProfile->app_birth_date)->age;
                $civil_status = $civil_statuses[$data->TblapplicantsProfile->app_civil_status];
                $email = $data->TblapplicantsProfile->app_email_addr;
                $number = $data->TblapplicantsProfile->app_mobile_no;
                $profile_message = $age . " years Old; " . $civil_status . ";\n" . $email . ";\n" . $number;

                /**
                 * Loop through  and Trainings to get Highest
                 */
                $highest['training_hours'] = 0;
                $highest['training'] = "";
                foreach ($data->tblapplicantTrainings as $appTrainings) {
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
                $highest['education_text'] = "";
                foreach ($data->tblapplicantEducation as $appEducation) {
                    $current = $appEducation->edu_app_level;
                    if ($current > $highest['education_level']) {
                        $highest['education_level'] = $current;
                        $highest['education_text'] = $education[$current];

                        $highest['education'] = $appEducation->edu_app_degree;
                    }
                }
                $highest['eligibility_id'] = 0;
                $highest['eligibility'] = "";
                foreach ($data->tblapplicantEligibility as $appEligibility) {
                    $current = $appEligibility->cse_app_title;
                    if ($current > $highest['eligibility_id']) {
                        $highest['eligibility_id'] = $current;
                        $highest['eligibility'] = $eligibility[$current];
                    }
                }

                $highest['experience_years'] = 0;
                $highest['experience'] = "";
                foreach ($data->tblapplicantExperience as $appExperience) {
                    $applicantExpField = [];
                    $start = new Carbon($appExperience->exp_app_from, 'Asia/Manila');
                    $end = new Carbon($appExperience->exp_app_to, 'Asia/Manila');
                    $related_fields = explode(',', $appExperience->exp_app_rel_fields);
                    // foreach ($related_fields as $field) {
                    //     $applicantExpField['field'] = $field;
                    //     if (empty($applicantExpField['years'])) {
                    //         $applicantExpField['years'] = $start->diffInYears($end, true);
                    //     } else {
                    //         $applicantExpField['years'] += $start->diffInYears($end, true);
                    //     }
                    // $current = $applicantExpField['years'] += $start->diffInYears($end, true);
                    //     if ($current > $highest['experience_years']) {
                    $highest['experience_years'] += $start->diffInYears($end, true);
                    $highest['experience'] = $appExperience->exp_app_rel_fields;
                    //     }
                    // }
                }
                $year_text = "";
                if ($highest['experience_years'] == 1) {
                    $year_text = " year of experience";
                } else {
                    $year_text = " years of experience";
                }

                $name = $data->TblapplicantsProfile->app_nm_last . ", " . $data->TblapplicantsProfile->app_nm_first . ' ' . substr($data->TblapplicantsProfile->app_nm_mid, 0, 1) . '.';
                $email = $data->TblapplicantsProfile->app_email_addr;
                $position_message = $data->TblPositions->pos_title . ";\n" . $data->TblOffices->ofc_acronym;
                $qualification_message = $highest['education_text'] . " in " . $highest['education'] . ";\n" .
                    $highest['experience_years'] . $year_text . "\n" . $highest['training_hours'] . " hours training in " .
                    $highest['training'] . "; " . $highest['eligibility'] . "";

                $arrayToPush = [
                    'app_id' => $data->app_id,
                    'app_name' => $name,
                    'app_email' => $email,
                    'profile_message' => $profile_message,
                    'qualification_message' => $qualification_message,
                    'position_message' => $position_message,
                    'position' => $data->TblPositions->pos_title,
                    'plantilla' => $data->TblplantillaItems->itm_id,
                ];

                $applicants[] = $arrayToPush;
            }
            return CommonResource::collection($applicants);
        }
        return [];
    }
    public function getPositionCM($plantillaId)
    {
        $qualified_applicants = $this->recruitmentSerivce->getCMDetails($plantillaId);
        $requirements = $this->recruitmentSerivce->getPositionRequirement($qualified_applicants->TblPositions->pos_id);
        $data = [
            'plantilla' => $qualified_applicants,
            'requirements' => $requirements
        ];
        return new CommonResource($data);
    }
    public function getCMData($plantillaId)
    {
        $qualified_applicants = $this->recruitmentSerivce->getQualifiedApplicants_report($plantillaId);
        $data = [
            'applicants' => $qualified_applicants,
        ];
        return new CommonResource($data);
    }

    public function getRAData($plantillaId, $applicantId)
    {
        $qualified_applicants = $this->recruitmentSerivce->getRAData($plantillaId, $applicantId);
        return new CommonResource($qualified_applicants);
    }
    public function generatePOAReport($plantillaId)
    {
        $qualified_applicants = $this->recruitmentSerivce->getQualifiedApplicants_report($plantillaId);
        $requirements = $this->recruitmentSerivce->getPositionRequirement($qualified_applicants[0]->TblPositions->pos_id);
        // return $qualified_applicants;
        return $this->recruitmentSerivce->generatePOAReport($qualified_applicants, $requirements);
    }
    public function getRAIDATA($month, $year)
    {
        return $this->recruitmentSerivce->getRAIData($month, $year);
    }
    public function generateRAIReport($month, $year)
    {
        $data = $this->recruitmentSerivce->getRAIData($month, $year);
        return $this->recruitmentSerivce->generateRAIReport($month, $year, $data);
    }
    public function generateCMReport($plantillaId)
    {
        $qualified_applicants = $this->recruitmentSerivce->getQualifiedApplicants_report($plantillaId);
        $requirements = $this->recruitmentSerivce->getPositionRequirement($qualified_applicants[0]->TblPositions->pos_id);
        return $this->recruitmentSerivce->generateCMReport($qualified_applicants, $requirements);
    }
    public function generateOOOReport($applicants)
    {
        return $this->recruitmentSerivce->generateOOOReport($applicants);
    }
    public function generateCADReport($applicants)
    {
        return $this->recruitmentSerivce->generateCADReport($applicants);
    }
    public function generateAFAReport($applicants)
    {
        return $this->recruitmentSerivce->generateAFAReport($applicants);
    }
    public function getApplicantAgency($office_id)
    {
        return $this->recruitmentSerivce->getApplicantAgency($office_id);
    }

    public function saveAssessment(Request $request)
    {
        return $this->recruitmentSerivce->saveAssessment($request);
    }

    public function saveCompetencyAssessment(Request $request)
    {
        return $this->recruitmentSerivce->saveCompetencyAssessment($request);
    }

    public function getBattery($level, $sg, $appID)
    {
        return CommonResource::collection(
            $this->recruitmentSerivce->getBattery($level, $sg, $appID)
        );
    }

    public function saveEmploymentExam(Request $request)
    {
        return $this->recruitmentSerivce->saveEmploymentExam($request);
    }

    public function getAssessment($id)
    {
        $query = TblapplicantsAssessments::where('ass_app_id', $id)->first();
        return new CommonResource($query);
    }

    public function saveAppointment(Request $request)
    {
        return $this->recruitmentSerivce->saveAppointment($request);
    }

    public function getHRMPSB($appID, $type)
    {
        return CommonResource::collection(
            $this->recruitmentSerivce->getHRMPSB($appID, $type)
        );
    }

    public function saveHRMPSB(Request $request)
    {
        return $this->recruitmentSerivce->saveHRMPSB($request);
    }
    public function saveHRMPSBRemarks(Request $request)
    {
        return $this->recruitmentSerivce->saveHRMPSBRemarks($request);
    }
}
