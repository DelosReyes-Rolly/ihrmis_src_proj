<?php

namespace App\Services\Applicant;

use App\Mail\VerifyApplicantMail;
use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Applicants\TblapplicantVerification;
use App\Models\TblplantillaItems;
use App\Models\TblpositionCscStandards;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Mpdf\Mpdf;
use NumberFormatter;

class ApplicantProfileService
{

    public function createApplicant($request, $position)
    {
        //IMPLODING ADDRESSES
        $fullAddress = [];
        array_push($fullAddress, $request->res_block_lot);
        array_push($fullAddress, $request->res_street);
        array_push($fullAddress, $request->res_sub_village);
        array_push($fullAddress, $request->res_zip_code);
        array_push($fullAddress, $request->res_barangay);
        array_push($fullAddress, $request->res_municipality);
        array_push($fullAddress, $request->res_province);

        $address = implode("|", $fullAddress);

        $applicantData = new TblapplicantsProfile();
        //USER INFO
        $applicantData->app_nm_last = $request->app_nm_last;
        $applicantData->app_nm_first = $request->app_nm_first;
        $applicantData->app_nm_mid = $request->app_nm_mid;
        $applicantData->app_nm_extn = $request->app_nm_extn ?? "N/A";
        $applicantData->app_birth_date = $request->app_birth_date;
        $applicantData->app_birth_place = $request->app_birth_place ?? "";
        $applicantData->app_sex = $request->app_sex ?? "M";
        $applicantData->app_blood_type = $request->app_blood_type ?? "AB+";
        $applicantData->app_civil_status = $request->app_civil_status ?? "SG";


        // CIVIL STATUS
        if ($request->app_civil_status == "OT") {
            $applicantData->app_civil_others = $request->app_civil_others;
        } else {
            $applicantData->app_civil_others = "N/A";
        }


        $applicantData->app_height = $request->app_height;
        $applicantData->app_weight = $request->app_weight;

        //EMPLOYMENT INFO
        $applicantData->app_emp_no = $request->app_emp_no ?? "N/A";
        $applicantData->app_gsis = $request->app_gsis;
        $applicantData->app_pagibig = $request->app_pagibig;
        $applicantData->app_philhealth = $request->app_philhealth;
        $applicantData->app_sss = $request->app_sss;
        $applicantData->app_tin = $request->app_tin;

        //CITIZENSHIP INFO
        $applicantData->app_filipino = $request->app_filipino;

        if ($request->app_filipino == 1) {
            if ($request->app_dual_type_check == 1) {
                $applicantData->app_dual_type = $request->app_dual_type;
            } else {
                $applicantData->app_dual_type = 0;
            }
            $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "NA";
        } else if ($request->app_filipino == 0) {
            $applicantData->app_dual_type = 0;
        }

        //ADDRESS INFO
        if ($request->boolean("copy_res_addr")  == false) {
            $perAddrssArr = [];
            array_push($perAddrssArr, $request->per_block_lot);
            array_push($perAddrssArr, $request->per_street);
            array_push($perAddrssArr, $request->per_sub_village);
            array_push($perAddrssArr, $request->per_zip_code);
            array_push($perAddrssArr, $request->per_barangay);
            array_push($perAddrssArr, $request->per_municipality);
            array_push($perAddrssArr, $request->per_province);
            $perAddress = implode("|", array_filter($perAddrssArr));

            $applicantData->app_resident_addr = $address;
            $applicantData->app_permanent_addr = $perAddress;
        } else {
            $applicantData->app_resident_addr = $address;
            $applicantData->app_permanent_addr = $address;
        }

        //CONTACT INFO
        $applicantData->app_tel_no = $request->app_tel_no;
        $applicantData->app_mobile_no = $request->app_mobile_no;
        $applicantData->app_email_addr = $request->app_email_addr;

        //ID INFO
        $applicantData->app_id_issued = $request->app_id_issued ?? "NA";
        $applicantData->app_id_no = $request->app_id_no ?? "NA";
        $applicantData->app_id_dateplace = $request->app_id_dateplace ?? "NA";
        $applicantData->app_agree = $request->app_agree ?? 0;

        $applicantData->save();
        $this->createdApplicant($applicantData, $position);
    }

    public function createdApplicant($applicantData, $position)
    {
        $applicant = new Tblapplicants();
        $applicant->app_id = $applicantData->app_id;
        $applicant->app_itm_id = $position;
        $applicant->save();

        $fullnameArray = [];
        $APPLICANT_TOKEN = Str::random(64);


        $createVerification = new TblapplicantVerification();
        $createVerification->vry_app_id = $applicantData->app_id;
        $createVerification->vry_app_token = $APPLICANT_TOKEN;
        $createVerification->save();

        if ($applicantData->app_nm_extn !== 'N/A') {
            $fullnameArray = [
                $applicantData->app_nm_first,
                $applicantData->app_nm_mid,
                $applicantData->app_nm_last,
                $applicantData->app_nm_extn,
            ];
        } else {
            $fullnameArray = [
                $applicantData->app_nm_first,
                $applicantData->app_nm_mid,
                $applicantData->app_nm_last
            ];
        }

        $fullname = implode(" ", $fullnameArray);

        $details = [
            'subject' => 'APPLICATION EMAIL VERICATION',
            'applicant_email' => $applicantData->app_email_addr,
            'applicant_name' => $fullname,
            'position' => 'Administrative Officer II',
            'from_email' => env('MAIL_FROM_ADDRESS'),
            'recruiter' => env('MAIL_FROM_RECUITER'),
            'redirect_link' =>  env('APP_API_URL') . 'verify-email?token=' . $APPLICANT_TOKEN . '&applicant=' . $applicantData->app_id
        ];

        Mail::to($details['applicant_email'])->send(new VerifyApplicantMail($details));
        return $applicantData->app_id;
    }

    public function modifyApplicant($id, $request)
    {

        //IMPLODING ADDRESSES
        $fullAddress = [];
        array_push($fullAddress, $request->res_block_lot);
        array_push($fullAddress, $request->res_street);
        array_push($fullAddress, $request->res_sub_village);
        array_push($fullAddress, $request->res_zip_code);
        array_push($fullAddress, $request->res_barangay);
        array_push($fullAddress, $request->res_municipality);
        array_push($fullAddress, $request->res_province);

        $address = implode("|", $fullAddress);

        $applicantData = TblapplicantsProfile::find($id);

        //USER INFO
        $applicantData->app_nm_last = $request->app_nm_last;
        $applicantData->app_nm_first = $request->app_nm_first;
        $applicantData->app_nm_mid = $request->app_nm_mid;
        $applicantData->app_nm_extn = $request->app_nm_extn ?? "N/A";
        $applicantData->app_birth_date = $request->app_birth_date;
        $applicantData->app_birth_place = $request->app_birth_place ?? "";
        $applicantData->app_sex = $request->app_sex ?? "M";
        $applicantData->app_blood_type = $request->app_blood_type ?? "AB+";
        $applicantData->app_civil_status = $request->app_civil_status ?? "SG";

        // CIVIL STATUS
        if ($request->app_civil_status == "OT") {
            $applicantData->app_civil_others = $request->app_civil_others;
        } else {
            $applicantData->app_civil_others = "NA";
        }


        $applicantData->app_height = $request->app_height;
        $applicantData->app_weight = $request->app_weight;

        //EMPLOYMENT INFO
        $applicantData->app_emp_no = $request->app_emp_no ?? "N/A";
        $applicantData->app_gsis = $request->app_gsis;
        $applicantData->app_pagibig = $request->app_pagibig;
        $applicantData->app_philhealth = $request->app_philhealth;
        $applicantData->app_sss = $request->app_sss;
        $applicantData->app_tin = $request->app_tin;

        //CITIZENSHIP INFO
        $applicantData->app_filipino = $request->app_filipino;

        if ($request->app_filipino == 1) {
            if ($request->app_dual_type_check == 1) {
                $applicantData->app_dual_type = $request->app_dual_type;
            } else {
                $applicantData->app_dual_type = 0;
            }
            $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "NA";
        } else if ($request->app_filipino == 0) {
            $applicantData->app_dual_type = 0;
        }

        //ADDRESS INFO
        if ($request->boolean("copy_res_addr")  == false) {
            $perAddrssArr = [];
            array_push($perAddrssArr, $request->per_block_lot);
            array_push($perAddrssArr, $request->per_street);
            array_push($perAddrssArr, $request->per_sub_village);
            array_push($perAddrssArr, $request->per_zip_code);
            array_push($perAddrssArr, $request->per_barangay);
            array_push($perAddrssArr, $request->per_municipality);
            array_push($perAddrssArr, $request->per_province);
            $perAddress = implode("|", array_filter($perAddrssArr));

            $applicantData->app_resident_addr = $address;
            $applicantData->app_permanent_addr = $perAddress;
        } else {
            $applicantData->app_resident_addr = $address;
            $applicantData->app_permanent_addr = $address;
        }

        //CONTACT INFO
        $applicantData->app_tel_no = $request->app_tel_no;
        $applicantData->app_mobile_no = $request->app_mobile_no;
        $applicantData->app_email_addr = $request->app_email_addr;

        $applicantData->save();

        return $id;
    }

    /**
     * Sorts Applicants based on the Positions Requirements
     *
     * @param [int] $plantilla_id
     * @return QualifiedApplicants[]
     */
    public function getQualifiedApplicants($type)
    {
        $plantilla_query = TblplantillaItems::with('tblpositions')->get();
        $qualified_applicants = [];
        $unqualified_applicants = [];
        foreach ($plantilla_query as $plantilla) {
            $applicant_query = Tblapplicants::with(
                'tblapplicantEligibility',
                'tblapplicantEducation',
                'tblapplicantExperience',
                'tblapplicantTrainings',
                'TblapplicantsProfile',
                'TblplantillaItems',
                'TblPositions',
                'tblapplicantsStatus',
                'tbltransactionStages',
                'TblOffices'
            )->where('app_itm_id', $plantilla->itm_id)->get();
            // return $applicant_query;
            //Get Position Requirements
            $position_query = TblpositionCscStandards::where('std_pos_id', $plantilla->tblpositions->pos_id)->get();

            $civil_service_type = [];
            $education = [];

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
                $requirements = 0;
                $qualified = false;
                if (count($applicant->tblapplicantsStatus) != 0) {
                    $status = $applicant->tblapplicantsStatus[count($applicant->tblapplicantsStatus) - 1];
                    if ($status->sts_app_stg_id == 2) {
                        $requirements = $requirements + 4;
                    } else if ($status->sts_app_stg_id == 3) {
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
                foreach ($civil_service_type as $CS) {
                    if (in_array($CS, $applicantEligibility)) {
                        $requirements++;
                    }
                }
                foreach ($education as $ED) {
                    $exploded_requirement = explode(':', $ED);
                    if (in_array($exploded_requirement[0], $applicantEducLevel) && in_array($exploded_requirement[1], $applicantEducSpecify)) {
                        $requirements++;
                    }
                }
                foreach ($experience as $EXP) {
                    foreach ($applicantExpField as $applicant_exp) {
                        if ($EXP == $applicant_exp['field'] && $experienceYears <= $applicant_exp['years']) {
                            $requirements++;
                        }
                    }
                }
                foreach ($training as $TRN) {
                    foreach ($applicantTrnCmptncy as $applicant_trn) {
                        if ($TRN == $applicant_trn['competency'] && $trainingHours <= $applicant_trn['hours']) {
                            $requirements++;
                        }
                    }
                }

                if ($requirements >= 4) {
                    array_push($qualified_applicants, $applicant);
                } else {
                    array_push($unqualified_applicants, $applicant);
                }
            }
        }

        if ($type == 1) {
            return $qualified_applicants;
        } else {
            return $unqualified_applicants;
        }
    }

    /**
     * Sorts Applicants based on the Positions Requirements for reports
     *
     * @param [int] $plantilla_id
     * @return QualifiedApplicants[]
     */
    public function getQualifiedApplicants_report($plantilla_id)
    {
        $plantilla_query = TblplantillaItems::with('tblpositions')->where('itm_id', $plantilla_id)->get();
        $qualified_applicants = [];
        $unqualified_applicants = [];
        foreach ($plantilla_query as $plantilla) {
            $applicant_query = Tblapplicants::with(
                'tblapplicantEligibility',
                'tblapplicantEducation',
                'tblapplicantExperience',
                'tblapplicantTrainings',
                'TblapplicantsProfile',
                'TblplantillaItems',
                'TblPositions',
                'tblapplicantsStatus',
                'tbltransactionStages',
                'TblOffices'
            )->where('app_itm_id', $plantilla_id)->get();
            //Get Position Requirements
            $position_query = TblpositionCscStandards::where('std_pos_id', $plantilla->tblpositions->pos_id)->get();
            // return $position_query;

            $civil_service_type = [];
            $education = [];

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
                $requirements = 0;
                $qualified = false;
                if (count($applicant->tblapplicantsStatus) != 0) {
                    $status = $applicant->tblapplicantsStatus[count($applicant->tblapplicantsStatus) - 1];
                    if ($status->sts_app_stg_id == 2) {
                        $requirements = $requirements + 4;
                    } else if ($status->sts_app_stg_id == 3) {
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
                foreach ($civil_service_type as $CS) {
                    if (in_array($CS, $applicantEligibility)) {
                        $requirements++;
                    }
                }
                foreach ($education as $ED) {
                    $exploded_requirement = explode(':', $ED);
                    if (in_array($exploded_requirement[0], $applicantEducLevel) && in_array($exploded_requirement[1], $applicantEducSpecify)) {
                        $requirements++;
                    }
                }
                foreach ($experience as $EXP) {
                    foreach ($applicantExpField as $applicant_exp) {
                        if ($EXP == $applicant_exp['field'] && $experienceYears <= $applicant_exp['years']) {
                            $requirements++;
                        }
                    }
                }
                foreach ($training as $TRN) {
                    foreach ($applicantTrnCmptncy as $applicant_trn) {
                        if ($TRN == $applicant_trn['competency'] && $trainingHours <= $applicant_trn['hours']) {
                            $requirements++;
                        }
                    }
                }
                if ($requirements >= 4) {
                    array_push($qualified_applicants, $applicant);
                } else {
                    array_push($unqualified_applicants, $applicant);
                }
            }
        }
        return $qualified_applicants;
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
            'exp' => ucfirst($number->format($experienceYears)) . ' (' . $experienceYears . ')' . ' years of relevant experience',
            // 'edu' => $education_level($highest['education_level']) . ' relevant to the job'
            'edu' => $education_level[$highest] . ' relevant to the job',
            'trn' => ucfirst($number->format($trainingHours)) . ' (' . $trainingHours . ')' . ' hours of relevant training',
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
    /**
     * Will Generate Profile of Pre-Qualified Applicants based on 
     * 
     * @param [type] $request
     * @return void
     */
    public function generateRAIReport($month, $year)
    {

        $report = new Mpdf([
            'format' => 'A4', 'orientation' => 'L', 'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch', 'pagenumPrefix' => 'Page ', 'nbpgPrefix' => ' of ',
        ]);
        // $data = [
        //     'office' => $applicants[0]->TblOffices->ofc_name,
        //     'pos_title' => $applicants[0]->TblPositions->pos_title,
        //     'salary' => $applicants[0]->TblPositions->pos_salary_grade,
        //     'item_no' => $applicants[0]->TblplantillaItems->itm_no,
        //     'applicants' => $applicants,
        //     'requirements' => $positionRequirements,
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

    public function generateOOOReport($applicants)
    {
        $report = new Mpdf([
            'format' => [215.9, 279.4], 'orientation' => 'P', 'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch', 'pagenumPrefix' => 'Page ', 'nbpgPrefix' => ' of ',
        ]);
        $applicantsId = explode('-', $applicants);
        // $data = [
        //     'office' => $applicants[0]->TblOffices->ofc_name,
        //     'pos_title' => $applicants[0]->TblPositions->pos_title,
        //     'salary' => $applicants[0]->TblPositions->pos_salary_grade,
        //     'item_no' => $applicants[0]->TblplantillaItems->itm_no,
        //     'applicants' => $applicants,
        // ];

        // return $applicants[0]->TblOffices->ofc_name;
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
        $applicantData = [];
        foreach ($applicantsId as $applicant) {
        $applicantData = $this->getApplicantData($applicant);
            $data = [
                'applicants_profile' =>  $applicantData['TblapplicantsProfile'],
                'applicants_position' =>  $applicantData['TblPositions'],
            ];
            // return $data;
            $report->AddPage();
            $report->writeHTML(view('reports/recruitment/oooReportPDF', $data));
        }




        return $report->output();
    }
}
