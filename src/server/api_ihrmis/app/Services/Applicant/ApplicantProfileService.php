<?php

namespace App\Services\Applicant;

use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\TblplantillaItems;
use App\Models\TblpositionCscStandards;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ApplicantProfileService
{

    public function createApplicant($request)
    {
        // $request->validate([
        //   'app_nm_last' => 'required|max:50|regex:/^[\pL\s\- ]+$/u',
        //   'app_nm_first' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
        //   'app_nm_extn' => 'max:10',
        //   'app_nm_mid' => 'required|alpha|max:50',
        //   'app_birth_date' => 'required|date_format:Y-m-d|before:today',
        //   'app_birth_place' => 'required',
        //   // 'app_sex' => 'required',
        //   // 'app_blood_type' => 'required',
        //   // 'app_civil_status' => 'required',

        //   'app_civil_others' => 'required_if:app_civil_status,OT',

        //   'app_height' => 'required|numeric',
        //   'app_weight' => 'required|numeric',

        //   'app_emp_no' => 'required|alpha_num',
        //   'app_gsis' => 'required|alpha_num',
        //   'app_pagibig' => 'required|alpha_num',
        //   'app_philhealth' => 'required|alpha_num',
        //   'app_sss' => 'required|alpha_num',
        //   'app_tin' => 'required|alpha_num',

        //   'app_filipino' => 'required',
        //   'app_dual_cny_id' => 'required_if:app_filipino,0',
        //   'app_dual_type' => 'required_if:is_dual_citizen,1',

        //   'res_block_lot' => 'required',
        //   'res_street' => 'required',
        //   'res_sub_village' => 'required',
        //   'res_zip_code' => 'required',
        //   'res_barangay' => 'required',
        //   'res_municipality' => 'required',
        //   'res_province' => 'required',

        //   'per_block_lot' => 'required_if:copied_addr,false',
        //   'per_street' => 'required_if:copied_addr,false',
        //   'per_sub_village' => 'required_if:copied_addr,false',
        //   'per_zip_code' => 'required_if:copied_addr,false',
        //   'per_barangay' => 'required_if:copied_addr,false',
        //   'per_municipality' => 'required_if:copied_addr,false',
        //   'per_province' => 'required_if:copied_addr,false',

        //   'app_tel_no' => 'required|numeric',
        //   'app_mobile_no' => 'required|numeric',
        //   'app_email_addr' => 'required|email:rfc',
        // ], [
        //     'required' => 'This field is required.',
        //     'required_if' => 'This field is required.',
        //     'numeric' => 'Invalid input.',
        //     'alpha_num' => 'Invalid input.',
        //     'max' =>  'Invalid input',
        //     'regex' => 'Invalid input',
        //     'email' => 'Invalid email'
        // ]);

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

        return $applicantData->id;
    }

    public function modifyApplicant($id, $request)
    {
        // $request->validate( [
        //   'app_nm_last' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
        //   'app_nm_first' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
        //   'app_nm_mid' => 'required|alpha|max:50',

        //   'app_birth_date' => 'required|date_format:Y-m-d|before:today',
        //   'app_birth_place' => 'required',
        //   // 'app_sex' => 'required',
        //   // 'app_blood_type' => 'required',
        //   // 'app_civil_status' => 'required',

        //   'app_civil_others' => 'required_if:app_civil_status,OT',

        //   'app_height' => 'required|numeric',
        //   'app_weight' => 'required|numeric',

        //   'app_emp_no' => 'required|alpha_num',
        //   'app_gsis' => 'required|alpha_num',
        //   'app_pagibig' => 'required|alpha_num',
        //   'app_philhealth' => 'required|alpha_num',
        //   'app_sss' => 'required|alpha_num',
        //   'app_tin' => 'required|alpha_num',

        //   'app_filipino' => 'required',
        //   'app_dual_cny_id' => 'required_if:app_filipino,0',
        //   'app_dual_type' => 'required_if:is_dual_citizen,1',

        //   'res_block_lot' => 'required',
        //   'res_street' => 'required',
        //   'res_sub_village' => 'required',
        //   'res_zip_code' => 'required',
        //   'res_barangay' => 'required',
        //   'res_municipality' => 'required',
        //   'res_province' => 'required',

        //   'per_block_lot' => 'required_if:copied_addr,false',
        //   'per_street' => 'required_if:copied_addr,false',
        //   'per_sub_village' => 'required_if:copied_addr,false',
        //   'per_zip_code' => 'required_if:copied_addr,false',
        //   'per_barangay' => 'required_if:copied_addr,false',
        //   'per_municipality' => 'required_if:copied_addr,false',
        //   'per_province' => 'required_if:copied_addr,false',

        //   'app_tel_no' => 'required|numeric',
        //   'app_mobile_no' => 'required|numeric',
        //   'app_email_addr' => 'required|email:rfc',
        // ], [
        //     'required' => 'This field is required.',
        //     'required_if' => 'This field is required.',
        //     'numeric' => 'Invalid input.',
        //     'alpha_num' => 'Invalid input.',
        //     'max' =>  'Invalid input',
        //     'regex' => 'Invalid input',
        //     'email' => 'Invalid email'
        // ]);

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
        $applicant_querys = [];
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
            array_push($applicant_querys, $applicant_query);
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
        }
        return $unqualified_applicants;
    }

    /**
     * Sorts Applicants based on the Positions Requirements
     *
     * @param [int] $plantilla_id
     * @return QualifiedApplicants[]
     */
    public function getQualifiedApplicants_report($plantilla_id)
    {
        $applicant_query = Tblapplicants::with(
            'tblapplicantEligibility',
            'tblapplicantEducation',
            'tblapplicantExperience',
            'tblapplicantTrainings',
            'TblapplicantsProfile',
            'TblplantillaItems',
            'TblPositions',
            'TblOffices'
        )->where('app_itm_id', $plantilla_id)->get();


        //Get Position Requirements
        $position_query = TblpositionCscStandards::where('std_pos_id', $plantilla_id)->get();

        $qualified_applicants = [];
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
            $requirements = 0;
            $qualified = false;
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
            }
        }
        return $qualified_applicants;
    }
}
