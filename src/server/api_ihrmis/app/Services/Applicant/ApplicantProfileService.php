<?php

namespace App\Services\Applicant;

use App\Mail\VerifyApplicantMail;
use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Applicants\TblapplicantVerification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
        $applicant->app_emp_id = $applicantData->app_emp_id;
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

    
}
