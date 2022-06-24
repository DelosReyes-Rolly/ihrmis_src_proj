<?php

namespace App\Http\Controllers\Recruitment;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\QualifiedApplicantsResource;
use App\Http\Resources\CommonResource;
use App\Services\Recruitment\RecruitmentService;

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
        if(isset($qualified_applicants[0])){
            return QualifiedApplicantsResource::collection($qualified_applicants[0]);
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

    public function generateRAIReport($month, $year)
    {
        return $this->recruitmentSerivce->generateRAIReport($month, $year);
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
}
