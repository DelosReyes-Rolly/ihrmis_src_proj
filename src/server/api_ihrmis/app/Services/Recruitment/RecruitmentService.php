<?php

namespace App\Services\Recruitment;

use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsAssessments;
use App\Models\Applicants\TblHrmpsbScore;
use App\Models\ExamScoreModel;
use App\Models\Library\EvaluationBatteryModel;
use App\Models\TblCmptncyAssessment;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use App\Models\TblpositionCscStandards;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mpdf\Mpdf;
use Mpdf\Tag\P;
use NumberFormatter;

class RecruitmentService
{
    /**
     * Gets all applicants that qualified for ALL plantilla position
     *
     * @param [int] $plantilla_id
     * @return QualifiedApplicants[]
     */
    public function getQualifiedApplicants($type)
    {
        $plantilla_query = TblplantillaItems::with('tblpositions')->get();
        $applicants = [];
        foreach ($plantilla_query as $plantilla) {
            if (count($this->getQualifiedQuery($plantilla, $plantilla->itm_id, $type)) > 0) {
                array_push($applicants, $this->getQualifiedQuery($plantilla, $plantilla->itm_id, $type));
            }
        }
        return $applicants;
    }

    /**
     * Gets all applicants that qualified for a plantilla position
     *
     * @param [int] $plantilla_id
     * @return QualifiedApplicants[]
     */
    public function getQualifiedApplicants_report($plantilla_id)
    {
        $applicants = $this->getQualifiedQuery(null, $plantilla_id, null);
        return $applicants;
    }

    function getQualifiedQuery($plantilla_data = null, $plantilla_id, $type = null)
    {
        $qualified_applicants = [];
        $unqualified_applicants = [];
        $applicant_query = Tblapplicants::with(
            'tblapplicantEligibility',
            'tblapplicantEducation',
            'tblapplicantExperience',
            'tblapplicantTrainings',
            'TblapplicantsProfile',
            'TblcmptncyRatings',
            'TblAssessments',
            'TblCmptcyScore',
            'TblCmptcy',
            'TblHrmpsbScore',
            'TblUser',
            'TblplantillaItems',
            'TblPositions',
            'tblapplicantsStatus',
            'tbltransactionStages',
            'TblOffices',
        )->where('app_itm_id', $plantilla_id)->get();

        //Get Position Requirements
        if ($plantilla_data != null) {
            $position_query = TblpositionCscStandards::where('std_pos_id', $plantilla_data->tblpositions->pos_id)->get();
        } else {
            $position_query = TblpositionCscStandards::where('std_pos_id', $applicant_query[0]->TblPositions->pos_id)->get();
        }


        $civil_service_type = [];
        $education = [];
        $experience = [];
        $training = [];
        /**
         * Gets All Applicant Qualifications and inserts it into an Array (due to the possibility) for comparison.
         */
        foreach ($position_query as $position_requirement) {
            if ($position_requirement->std_type == "CS") {
                $civil_service_type = explode('|', $position_requirement->std_keyword);
            }
            if ($position_requirement->std_type == "ED") {
                $education = explode('|', $position_requirement->std_keyword);
            }
            if ($position_requirement->std_type == "EX") {
                $experience = explode(', ', $position_requirement->std_keyword);
                $experienceYears = $position_requirement->std_quantity;
            }
            if ($position_requirement->std_type == "TR") {
                $training = explode(', ', $position_requirement->std_keyword);
                $trainingHours = $position_requirement->std_quantity;
            }
        }

        foreach ($applicant_query as $applicant) {
            $related_fields = [];
            $competencies = [];
            $applicantEligibility = [];
            $applicantEducLevel = [];
            $applicantEducSpecify = [];
            $applicantExpField = [];
            $applicantTrnCmptncy = [];
            $failedIn = '';
            $requirements = 0;

            if (count($applicant->tblapplicantsStatus) != 0) {
                $status = $applicant->tbltransactionStages[count($applicant->tbltransactionStages)-1];
                if ($status->stg_pass == 1) {
                    $requirements = $requirements + 4;
                } else {
                    $requirements = $requirements - 4;
                }
            }
            foreach ($applicant->tblapplicantEligibility as $appEligibility) {
                $applicantEligibility[] = $appEligibility->cse_app_title;
            }
            foreach ($applicant->tblapplicantEducation as $appEducation) {
                $applicantEducLevel[] = $appEducation->edu_app_level;
                $applicantEducSpecify[] = $appEducation->edu_app_degree;
            }
            foreach ($applicant->tblapplicantExperience as $appExperience) {
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
                }
            }
            foreach ($applicant->tblapplicantTrainings as $appTrainings) {
                $competencies = explode(',', $appTrainings->trn_app_cmptncy);
                foreach ($competencies as $competency) {
                    $applicantTrnCmptncy[$competency]['competency'] = $competency;
                    if (empty($applicantTrnCmptncy[$competency]['hours'])) {
                        $applicantTrnCmptncy[$competency]['hours'] = $appTrainings->trn_app_hours;
                    } else {
                        $applicantTrnCmptncy[$competency]['hours'] += $appTrainings->trn_app_hours;
                    }
                }
            }
            $check = false;
            foreach ($civil_service_type as $CS) {
                if (in_array($CS, $applicantEligibility)) {
                    $requirements++;
                    $check = true;
                }
            }
            if (!$check) {
                $failedIn .= 'Elegibility,';
            }

            $check = false;
            foreach ($education as $ED) {
                $exploded_requirement = explode(':', $ED);
                if (in_array($exploded_requirement[0], $applicantEducLevel) && in_array($exploded_requirement[1], $applicantEducSpecify)) {
                    $requirements++;
                    $check = true;
                }
            }
            if (!$check) {
                $failedIn .= 'Education,';
            }

            $check = false;
            foreach ($experience as $EXP) {
                foreach ($applicantExpField as $applicant_exp) {
                    if ($EXP == $applicant_exp['field'] && $experienceYears <= $applicant_exp['years']) {
                        $requirements++;
                        $check = true;
                    }
                }
            }
            if (!$check) {
                $failedIn .= 'Experience,';
            }

            $check = false;
            foreach ($training as $TRN) {
                foreach ($applicantTrnCmptncy as $applicant_trn) {
                    if ($TRN == $applicant_trn['competency'] && $trainingHours <= $applicant_trn['hours']) {
                        $requirements++;
                        $check = true;
                    }
                }
            }
            if (!$check) {
                $failedIn .= 'Training,';
            }
            $applicant->failedIn = $failedIn;

            if ($requirements >= 4) {
                array_push($qualified_applicants, $applicant);
            } else {
                array_push($unqualified_applicants, $applicant);
            }
        }
        if ($type == 1 || $type == null) {
            return $qualified_applicants;
        } else {
            return $unqualified_applicants;
        }
    }

    public function getCMDetails($plantilla_id)
    {
        $applicant_query = TblplantillaItems::with(
            'tblpositions',
            'tbloffices'
        )->where('itm_id', $plantilla_id)->first();
        return $applicant_query;
    }

    public function getRAData($plantilla_id, $applicant_id)
    {
        $applicant_query = Tblapplicants::with(
            'tblapplicantEligibility',
            'tblapplicantEducation',
            'tblapplicantExperience',
            'tblapplicantTrainings',
            'TblapplicantsProfile',
            'TblcmptncyRatings',
            'TblAssessments',
            'TblCmptcyScore',
            'TblCmptcy',
            'TblHrmpsbScore',
            'TblUser',
        )->where('app_itm_id', $plantilla_id)->where('app_id', $applicant_id)->get();
        return $applicant_query;
    }

    /**
     * Gets Position Requirements, returns all in text
     *
     * @param [type] $pos_id
     * @return void
     */
    public function getPositionRequirement($pos_id)
    {
        $position_requirement = TblpositionCscStandards::where('std_pos_id', $pos_id)->get();
        $eligibility_array = [];
        $eligibility_array[] = 'No Eligibility';
        $eligibility_array[] = 'Professional';
        $eligibility_array[] = 'Sub-professional';
        $eligibility_array[] = 'Board / Bar';
        $eligibility_array[] = 'Barangay Health Worker';
        $eligibility_array[] = 'Barangay Official';
        $eligibility_array[] = 'Barangay Nutrition Scholar';
        $eligibility_array[] = 'Electronic Data Processing Specialist (EDPS)';
        $eligibility_array[] = 'Honor Graduate';
        $eligibility_array[] = 'Foreign School Honor Graduate';
        $eligibility_array[] = 'Scientific and Technological Specialist';
        $eligibility_array[] = 'Veteran Preference Rating';
        $eligibility_array[] = 'Sanggunian Member';
        $eligibility_array[] = 'Skill Eligibility';

        $education_level = [];
        $education_level[] = 'N/A';
        $education_level[] = 'Elementary';
        $education_level[] = 'Secondary';
        $education_level[] = 'Vocational/Trade';
        $education_level[] = 'Bachelors Degree';
        $education_level[] = 'Doctorate Degree';
        $experienceYears = 0;
        $educations = [];
        $trainingHours = 0;
        foreach ($position_requirement as $requirement) {
            if ($requirement->std_type == "ED") {
                $exploded_requirement = explode('|', $requirement->std_keyword);
            }
            if ($requirement->std_type == 'EX') {
                $experienceYears = $requirement->std_quantity;
            }
            if ($requirement->std_type == "TR") {
                $trainingHours = $requirement->std_quantity;
            }
            if ($requirement->std_type == "CS") {
                $civil_service_type = explode('|', $requirement->std_keyword);
            }
        }
        $highest = [];
        $highest = 0;
        $number = new NumberFormatter("en", NumberFormatter::SPELLOUT);
        $current = 0;
        foreach ($exploded_requirement as $education_requirements) {
            $educations = explode(':', $education_requirements);
            $current = $educations[0];
            if ($current < $highest || $highest == 0) {
                $highest = $current;
            }
        }
        $civil_service_text = '';
        for ($i = 0; $i < count($civil_service_type); $i++) {
            if ($i == count($civil_service_type) - 1) {
                $civil_service_text .= $eligibility_array[$civil_service_type[$i]];
            } else {
                $civil_service_text .= $eligibility_array[$civil_service_type[$i]] . ' / ';
            }
        }
        $requirements = [
            // 'exp' => ucfirst($number->format($experienceYears)) . ' (' . $experienceYears . ' years of relevant experience',
            'exp' => $experienceYears . ' years of relevant experience',
            // 'edu' => $education_level($highest['education_level']) . ' relevant to the job'
            'edu' => $education_level[$highest] . ' relevant to the job',
            'trn' => $trainingHours . ' hours of relevant training',
            'eli' => $civil_service_text,
        ];
        return $requirements;
    }
    /**
     * Will Generate Profile of Pre-Qualified Applicants based on
     *
     * @param [type] $request
     * @return void
     */
    public function generatePOAReport($applicants, $positionRequirements)
    {

        $report = new Mpdf([
            'format' => 'Legal', 'orientation' => 'L', 'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch', 'pagenumPrefix' => 'Page ', 'nbpgPrefix' => ' of ',
        ]);
        $data = [
            'office' => $applicants[0]->TblOffices->ofc_name,
            'pos_title' => $applicants[0]->TblPositions->pos_title,
            'salary' => $applicants[0]->TblPositions->pos_salary_grade,
            'item_no' => $applicants[0]->TblplantillaItems->itm_no,
            'applicants' => $applicants,
            'requirements' => $positionRequirements,
        ];

        // return $applicants[0]->TblOffices->ofc_name;
        $report->writeHTML(view('reports/recruitment/poaReportPDF', $data));
        $report->AddPage('L');
        $report->page = 0;
        $report->state = 0;
        unset($report->pages[0]);
        $report->PageNumSubstitutions[] = [
            'from' => 0,
            'reset' => 0,
            'type' => 'num',
            'suppress' => 'off'
        ];
        $report->writeHTML(view('reports/recruitment/poaReportPDF', $data));
        $report->SetFooter('<p class="center">{PAGENO}</p>');
        return $report->output();
    }

    public function getRAIData($month, $year)
    {
        $applicant_query = Tblapplicants::with(['TblplantillaItems', 'TblPositions', 'TblapplicantsProfile'])
            ->where(DB::raw('YEAR(app_appntmnt)'), $year)
            ->where(DB::raw('MONTH(app_appntmnt)'), $month)->get();
        if (!isset($applicant_query[0]->app_appntmnt)) {
            $applicant_query = Tblapplicants::with(['TblplantillaItems', 'TblPositions', 'TblapplicantsProfile'])
                ->where(DB::raw('YEAR(app_assmptn)'), $year)->where(DB::raw('MONTH(app_assmptn)'), $month)->get();
        }
        return $applicant_query;
    }
    /**
     * Will Generate Profile of Pre-Qualified Applicants based on
     *
     * @param [type] $request
     * @return void
     */
    public function generateRAIReport($month, $year, $data)
    {

        $report = new Mpdf([
            'format' => 'A4', 'orientation' => 'L', 'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch', 'pagenumPrefix' => 'Page ', 'nbpgPrefix' => ' of ',
        ]);
        // $data = [
        // 'office' => $applicants[0]->TblOffices->ofc_name,
        // 'pos_title' => $applicants[0]->TblPositions->pos_title,
        // 'salary' => $applicants[0]->TblPositions->pos_salary_grade,
        // 'item_no' => $applicants[0]->TblplantillaItems->itm_no,
        // 'applicants' => $applicants,
        // 'requirements' => $positionRequirements,
        // ];
        $monthConverter = [];
        $monthConverter[1] = 'January';
        $monthConverter[2] = 'February';
        $monthConverter[3] = 'March';
        $monthConverter[4] = 'April';
        $monthConverter[5] = 'May';
        $monthConverter[6] = 'June';
        $monthConverter[7] = 'July';
        $monthConverter[8] = 'August';
        $monthConverter[9] = 'September';
        $monthConverter[10] = 'October';
        $monthConverter[11] = 'November';
        $monthConverter[12] = 'December';

        $data = [
            'date' => $monthConverter[$month] . ' ' . $year,
            'details' => $data,
        ];

        // return $applicants[0]->TblOffices->ofc_name;
        $report->writeHTML(view('reports/recruitment/raiReportPDF', $data));
        $report->AddPage('L');
        $report->page = 0;
        $report->state = 0;
        unset($report->pages[0]);
        $report->PageNumSubstitutions[] = [
            'from' => 0,
            'reset' => 0,
            'type' => 'num',
            'suppress' => 'off'
        ];
        $report->writeHTML(view('reports/recruitment/raiReportPDF', $data));
        return $report->output();
    }

    public function generateCMReport($applicants, $positionRequirements)
    {
        $report = new Mpdf([
            'format' => 'Legal', 'orientation' => 'L', 'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch', 'pagenumPrefix' => 'Page ', 'nbpgPrefix' => ' of ',
        ]);
        $data = [
            'office' => $applicants[0]->TblOffices->ofc_name,
            'pos_title' => $applicants[0]->TblPositions->pos_title,
            'salary' => $applicants[0]->TblPositions->pos_salary_grade,
            'item_no' => $applicants[0]->TblplantillaItems->itm_no,
            'applicants' => $applicants,
            'requirements' => $positionRequirements,
        ];

        // return $applicants[0]->TblOffices->ofc_name;
        $report->writeHTML(view('reports/recruitment/cmReportPDF', $data));
        $report->AddPage('L');
        $report->page = 0;
        $report->state = 0;
        unset($report->pages[0]);
        $report->PageNumSubstitutions[] = [
            'from' => 0,
            'reset' => 0,
            'type' => 'num',
            'suppress' => 'off'
        ];
        $report->writeHTML(view('reports/recruitment/cmReportPDF', $data));
        $report->AddPage('L');

        $report->writeHTML(view('reports/recruitment/cmReportPDF-part2', $data));

        return $report->output();
    }
    public function getApplicantData($applicant_id)
    {
        $applicant_query = Tblapplicants::with(
            'TblapplicantsProfile',
            'TblplantillaItems',
            'TblPositions',
            'TblOffices'
        )->where('app_id', $applicant_id)->first();

        return $applicant_query;
    }

    public function getApplicantAgency($office_id)
    {
        $query = Tbloffices::with('officeAgency')->where('ofc_id', $office_id)->first();
        if (empty($query)) {
            return response()->json(['message' => "Selected Office does not exist"], 404);
        } else {
            return $query;
        }
    }
    public function setPDFDetails_ooo_cad_afa()
    {
        $report = new Mpdf([
            'format' => [215.9, 279.4], 'orientation' => 'P', 'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch', 'pagenumPrefix' => 'Page ', 'nbpgPrefix' => ' of ',
        ]);
        $report->writeHTML('');
        $report->page = 0;
        $report->state = 0;
        unset($report->pages[0]);
        $report->PageNumSubstitutions[] = [
            'from' => 0,
            'reset' => 0,
            'type' => 'num',
            'suppress' => 'off'
        ];
        return $report;
    }
    public function generateOOOReport($applicants)
    {
        $report = $this->setPDFDetails_ooo_cad_afa();
        $applicantsId = explode('-', $applicants);
        $applicantData = [];
        foreach ($applicantsId as $applicant) {
            $applicantData = $this->getApplicantData($applicant);
            $data = [
                'applicants_profile' => $applicantData['TblapplicantsProfile'],
                'applicants_position' => $applicantData['TblPositions'],
            ];
            // return $data;
            $report->AddPage();
            $report->writeHTML(view('reports/recruitment/oooReportPDF', $data));
        }
        return $report->output();
    }

    public function generateCADReport($applicants)
    {
        $report = $this->setPDFDetails_ooo_cad_afa();
        $applicantsId = explode('-', $applicants);
        $applicantData = [];
        foreach ($applicantsId as $applicant) {
            $applicantData = $this->getApplicantData($applicant);
            $data = [
                'applicants_profile' => $applicantData['TblapplicantsProfile'],
                'applicants_position' => $applicantData['TblPositions'],
                'applicants_office' => $this->getApplicantAgency($applicantData['TblOffices']['ofc_id']),
            ];
            // return $data;
            $report->AddPage();
            $report->writeHTML(view('reports/recruitment/cadReportPDF', $data));
        }
        return $report->output();
    }

    public function generateAFAReport($applicants)
    {
        $report = $this->setPDFDetails_ooo_cad_afa();
        $applicantsId = explode('-', $applicants);
        $applicantData = [];
        foreach ($applicantsId as $applicant) {
            $applicantData = $this->getApplicantData($applicant);
            $data = [
                'applicants_profile' => $applicantData['TblapplicantsProfile'],
                'applicants_position' => $applicantData['TblPositions'],
                'applicant_plantilla_item' => $applicantData['TblplantillaItems'],
                'applicants_office' => $this->getApplicantAgency($applicantData['TblOffices']['ofc_id']),
            ];
            $report->AddPage();
            $report->writeHTML(view('reports/recruitment/afaReportPDF', $data));
        }
        return $report->output();
    }

    public function saveAssessment($request)
    {
        $type = [];
        $type['ED'] = 'ass_education';
        $type['EX'] = 'ass_experience';
        $type['TR'] = 'ass_training';

        try {
            $query = TblapplicantsAssessments::firstOrNew(["ass_app_id" => $request->app_id]);
            if ($request->type == 'ED') {
                $query->ass_education = $request->Score;
            }
            if ($request->type == 'EX') {
                $query->ass_experience = $request->Score;
            }
            if ($request->type == 'TR') {
                $query->ass_training = $request->Score;
            }
            $query->save();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Failed, Try again later",
            ], 400);
        }

        return response()->json([
            'message' => "Added Successfully",
        ], 200);
    }
    public function saveCompetencyAssessment($request)
    {
        $fail = false;
        if ($request->ASval) {
            try {
                $query = TblCmptncyAssessment::firstOrNew(["com_ass_id" => $request->ASid]);
                $query->com_app_id = $request->app_id;
                $query->com_type = 'AS';
                $query->com_ass_score = $request->AS;
                $query->save();
            } catch (\Throwable $th) {
                $fail = true;
            }
        } else {
            $query = TblCmptncyAssessment::where(["com_ass_id" => $request->ASid])->delete();
        }
        if ($request->CSval) {
            try {
                $query = TblCmptncyAssessment::firstOrNew(["com_ass_id" => $request->CSid]);
                $query->com_app_id = $request->app_id;
                $query->com_type = 'CS';
                $query->com_ass_score = $request->CS;
                $query->save();
            } catch (\Throwable $th) {
                $fail = true;
            }
        } else {
            $query = TblCmptncyAssessment::where(["com_ass_id" => $request->CSid])->delete();
        }
        if ($request->CWval) {
            try {
                $query = TblCmptncyAssessment::firstOrNew(["com_ass_id" => $request->CWid]);
                $query->com_app_id = $request->app_id;
                $query->com_type = 'CW';
                $query->com_ass_score = $request->CW;
                $query->save();
            } catch (\Throwable $th) {
                $fail = true;
            }
        } else {
            $query = TblCmptncyAssessment::where(["com_ass_id" => $request->CWid])->delete();
        }
        if ($request->OEval) {
            try {
                $query = TblCmptncyAssessment::firstOrNew(["com_ass_id" => $request->OEid]);
                $query->com_app_id = $request->app_id;
                $query->com_type = 'OE';
                $query->com_ass_score = $request->OE;
                $query->save();
            } catch (\Throwable $th) {
                $fail = true;
            }
        } else {
            $query = TblCmptncyAssessment::where(["com_ass_id" => $request->OEid])->delete();
        }
        if ($request->WEval) {
            try {
                $query = TblCmptncyAssessment::firstOrNew(["com_ass_id" => $request->WEid]);
                $query->com_app_id = $request->app_id;
                $query->com_type = 'WE';
                $query->com_ass_score = $request->WE;
                $query->save();
            } catch (\Throwable $th) {
                $fail = true;
            }
        } else {
            $query = TblCmptncyAssessment::where(["com_ass_id" => $request->WEid])->delete();
        }
        if ($request->OTval) {
            try {
                $query = TblCmptncyAssessment::firstOrNew(["com_ass_id" => $request->OTid]);
                $query->com_app_id = $request->app_id;
                $query->com_type = 'OT';
                $query->com_ass_score = $request->OT;
                $query->save();
            } catch (\Throwable $th) {
                $fail = true;
            }
        } else {
            $query = TblCmptncyAssessment::where(["com_ass_id" => $request->OTid])->delete();
        }
        try {
            $query = TblapplicantsAssessments::firstOrNew(["ass_app_id" => $request->app_id]);
            $query->ass_remarks = $request->remarks;

            $query->save();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Failed, Try again later",
            ], 400);
        }

        if ($fail) {
            return response()->json([
                'message' => "Failed, Try again later",
            ], 400);
        }
        return response()->json([
            'message' => "Saved Successfully",
        ], 200);
    }

    public function getBattery($level, $sg, $appID)
    {
        return EvaluationBatteryModel::whereHas('Category', function ($query) use ($level) {
            return $query->where('tblcategory_groups.grp_level', $level);
        })->with(['Battery' => function ($query2) use ($appID) {
            return $query2->where('tblapplicant_exam_score.exam_app_id', $appID);
        }])->where('bat_sg_type', $sg)->orderBy('bat_itm_order')->get();
    }

    public function saveEmploymentExam($request)
    {

        $appID = $request->app_id;
        $remarks = $request->remarks;
        $date = $request->date;

        foreach ($_POST as $key => $value) {
            if ($key != 'app_id' && $key != 'date' && $key != 'remarks' && $key != 'type') {
                $query = ExamScoreModel::where("exam_app_id", $appID)->where("exam_battery_id", $key)->first();
                if (!isset($query)) {
                    $query = new ExamScoreModel();
                }
                $query->exam_app_id = $appID;
                $query->exam_battery_id = $key;
                $query->exam_score = $value;
                $query->save();
            }
        }
        try {
            $query = TblapplicantsAssessments::firstOrNew(["ass_app_id" => $request->app_id]);
            if ($request->type == 4) {
                $query->ass_exam_remarks = $request->remarks;
                $query->ass_exam_date = $request->date;
            } else {
                $query->ass_psych_remarks = $request->remarks;
                $query->ass_psych_date = $request->date;
            }


            $query->save();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Failed, Try again later",
            ], 400);
        }
        return response()->json([
            'message' => "Saved Successfully",
        ], 200);
        // $checker = ExamScoreModel::where("exam_app_id", $_POST->app_id)->where("exam_battery_id", $request->bat_sg_type)->get();
        return $_POST;
        // return $query = ExamScoreModel::where("exam_app_id", $appID)->get();
    }

    public function saveAppointment(Request $request)
    {
        $query = Tblapplicants::where(["app_id" => $request->appID])->first();
        if ($request->effectivity != null) {
            $query->app_appntmnt = $request->effectivity;
        } else {
            $query->app_period_from = $request->effectivityFrom;
            $query->app_period_to = $request->effectivityTo;
        }
        $query->app_assmptn = $request->assumption;
        $query->app_appointed = ($request->appointed) ? 1 : 0;
        $query->save();
        return response()->json([
            'message' => "Saved Successfully",
        ], 200);
    }

    public function getHRMPSB($appID, $type)
    {
        $query = TblHrmpsbScore::with('TblAssessment', 'TblUser')->where('hrmpsb_app_id', $appID)->where('hrmpsb_type', $type)->get();
        if (empty($query)) {
            return response()->json(['message' => "Selected Applicant does not exist"], 404);
        } else {
            return $query;
        }
    }

    public function saveHRMPSB(Request $request)
    {
        $eval = json_decode($request->evaluation);
        $test = [];
        foreach ($eval as $key => $value) {
            $query = TblHrmpsbScore::where("hrmpsb_user_id", $request->hrmpsb_user_id)
                ->where("hrmpsb_type", $value->type)
                ->where("hrmpsb_app_id", $request->appID)->first();
            if (!isset($query)) {
                $query = new TblHrmpsbScore();
            }
            $query->hrmpsb_user_id = $request->hrmpsb_user_id;
            $query->hrmpsb_app_id = $request->appID;
            $query->hrmpsb_type = $value->type;
            $query->hrmpsb_score = $value->score;
            $query->hrmpsb_remarks = $value->remark;
            $query->save();
        }
        return $query;
    }

    public function saveHRMPSBRemarks(Request $request)
    {
        $query = TblapplicantsAssessments::firstOrNew(["ass_app_id" => $request->app_id]);
        if ($request->type == 1) {
            $query->ass_attribute = $request->remarks;
        }
        if ($request->type == 2) {
            $query->ass_accomplishment = $request->remarks;
        }
        if ($request->type == 3) {
            $query->ass_performance = $request->remarks;
        }
        $query->save();
        return $query;
    }
}
