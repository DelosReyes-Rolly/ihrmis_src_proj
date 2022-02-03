<?php

namespace App\Http\Resources\Applicant;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;



class ApplicantProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $resAddressArry = explode("|", $this->app_resident_addr);
        $perAddressArry = explode("|", $this->app_permanent_addr);
        $id_no_str = "";
        $id_issued_str ="";
        $id_dateplace_str ="";
        if ($this->app_id_issued != 'NA' && $this->app_id_dateplace != 'NA' && $this->app_id_no != 'NA'){
            $id_issued_str = $this->app_id_issued;
            $id_no_str = $this->app_id_no;
            $id_dateplace_str =  $this->app_id_dateplace;
        } 
        
        return [
            'app_nm_last' => $this->app_nm_last ?? "",
            'app_nm_first' => $this->app_nm_first ?? "",
            'app_nm_extn' => $this->app_nm_extn ?? "",
            'app_nm_mid' =>  $this->app_nm_mid ?? "",
    
            'app_birth_date' => $this->app_birth_date ?? "",
            'app_birth_place' => $this->app_birth_place ?? "",
            'app_sex' => $this->app_sex ?? "",
            'app_blood_type' => $this->app_blood_type ?? "",
            'app_civil_status' => $this->app_civil_status ?? "",
            'app_civil_others' => $this->app_civil_others ?? "",
            'app_height' => $this->app_height ?? "",
            'app_weight' => $this->app_weight ?? "",
    
            'app_gsis' => $this->app_gsis ?? "",
            'app_pagibig' => $this->app_pagibig ?? "",
            'app_philhealth' => $this->app_philhealth ?? "",
            'app_sss' => $this->app_sss ?? "",
            'app_tin' => $this->app_tin ?? "",
            'app_emp_no' => $this->app_emp_no ?? "",
      
            'app_filipino' => $this->app_filipino ?? "",
            'app_dual_type' => $this->app_dual_type ?? "",
            'app_dual_cny_id' => $this->app_dual_cny_id ?? "",

            'res_block_lot' => $resAddressArry[0] ?? "",
            'res_street' => $resAddressArry[1] ?? "",
            'res_sub_village' => $resAddressArry[2] ?? "",
            'res_zip_code' => $resAddressArry[3] ?? "",
            'res_barangay' => $resAddressArry[4] ?? "",
            'res_municipality' => $resAddressArry[5] ?? "",
            'res_province' => $resAddressArry[6] ?? "",

            'per_block_lot' => $perAddressArry[0] ?? "",
            'per_street' =>  $perAddressArry[1] ?? "",
            'per_sub_village' =>  $perAddressArry[2] ?? "",
            'per_zip_code' =>  $perAddressArry[3] ?? "",
            'per_barangay' =>  $perAddressArry[4] ?? "",
            'per_municipality' =>  $perAddressArry[5] ?? "",
            'per_province' =>  $perAddressArry[6] ?? "",

            'app_tel_no' => $this->app_tel_no ?? "",
            'app_mobile_no' => $this->app_mobile_no ?? "",
            'app_email_addr' => $this->app_email_addr ?? "",
         
            'app_id_issued' => $id_issued_str ?? "",
            'app_id_dateplace' => $id_dateplace_str?? "",
            'app_id_no' => $id_no_str ?? "",
            'app_photo' => env("APP_URL"). ":8000" . "/storage/applicant/passport-img/" . $this->app_photo ?? "",
        ];
    }
}

// app_nm_last: dataState ? dataState.app_nm_last : "",
//       app_nm_first: dataState ? dataState.app_nm_first : "",
//       app_nm_extn: dataState ? dataState.app_nm_extn : "",
//       app_nm_mid: dataState ? dataState.app_nm_mid : "",

//       app_birth_date: dataState ? dataState.app_birth_date : "",
//       app_birth_place: dataState ? dataState.app_birth_place : "",
//       app_sex: dataState ? dataState.app_sex : "",
//       app_blood_type: dataState ? dataState.app_blood_type : "",
//       app_civil_status: dataState ? dataState.app_civil_status : "",
//       app_civil_others: dataState ? dataState.app_civil_others : "",
//       app_height: dataState ? dataState.app_height : "",
//       app_weight: dataState ? dataState.app_weight : "",

//       app_gsis: dataState ? dataState.app_gsis : "",
//       app_pagibig: dataState ? dataState.app_pagibig : "",
//       app_philhealth: dataState ? dataState.app_philhealth : "",
//       app_sss: dataState ? dataState.app_sss : "",
//       app_tin: dataState ? dataState.app_tin : "",
//       app_emp_no: dataState ? dataState.app_emp_no : "",

//       app_filipino: dataState ? dataState.app_filipino : "",
//       app_dual_cny_id: dataState ? dataState.app_dual_cny_id : "",
//       app_dual_type_check: dataState?.app_dual_type != "" ? true : false,
//       app_dual_type: dataState ? dataState.app_dual_type : "",

//       res_block_lot: dataState ? dataState.res_block_lot : "",
//       res_street: dataState ? dataState.res_street : "",
//       res_sub_village: dataState ? dataState.res_sub_village : "",
//       res_zip_code: dataState ? dataState.res_zip_code : "",
//       res_province: dataState ? dataState.res_province : "",
//       res_municipality: dataState ? dataState.res_municipality : "",
//       res_barangay: dataState ? dataState.res_barangay : "",

//       copy_res_addr: false,

//       per_block_lot: dataState ? dataState.per_block_lot : "",
//       per_street: dataState ? dataState.per_street : "",
//       per_sub_village: dataState ? dataState.per_sub_village : "",
//       per_zip_code: dataState ? dataState.per_zip_code : "",
//       per_province: dataState ? dataState.per_province : "",
//       per_municipality: dataState ? dataState.per_municipality : "",
//       per_barangay: dataState ? dataState.per_barangay : "",

//       app_tel_no: dataState ? dataState.app_tel_no : "",
//       app_mobile_no: dataState ? dataState.app_mobile_no : "",
//       app_email_addr: dataState ? dataState.app_email_addr : "",
//     },

//     validationSchema: Yup.object({
//       app_nm_last: validationName,
//       app_nm_first: validationName,
//       app_nm_extn: validationName,
//       app_nm_mid: validationName,

//       app_birth_date: validationRequired,
//       app_birth_place: validationRequired,
//       app_sex: validationRequired,
//       app_blood_type: validationRequired,
//       app_civil_status: validationRequired,
//       app_civil_others: Yup.string().when("app_civil_status", {
//         is: "OT",
//         then: validationRequired,
//       }),
//       app_height: validationRequiredNum,
//       app_weight: validationRequiredNum,

//       app_gsis: validationRequired,
//       app_pagibig: validationRequired,
//       app_philhealth: validationRequired,
//       app_sss: validationRequired,
//       app_tin: validationRequired,
//       app_emp_no: validationRequired,

//       app_filipino: validationRequiredNum,
//       app_dual_cny_id: Yup.string().when("app_filipino", {
//         is: 0,
//         then: Yup.string().required("This field is required"),
//       }),
//       app_dual_type_check: Yup.bool(),
//       app_dual_type: Yup.string().when("app_dual_type_check", {
//         is: 1,
//         then: Yup.string().required("This field is required"),
//       }),

//       res_block_lot: validationRequired,
//       res_street: validationRequired,
//       res_sub_village: validationRequired,
//       res_zip_code: validationRequiredNum,
//       res_province: validationRequired,
//       res_municipality: validationRequired,
//       res_barangay: validationRequired,

//       copy_res_addr: Yup.string(),

//       per_block_lot: PER_ADDR_RULE,
//       per_street: PER_ADDR_RULE,
//       per_sub_village: PER_ADDR_RULE,
//       per_zip_code: Yup.number().when("copy_res_addr", {
//         is: "false",
//         then: validationRequiredNum,
//       }),
//       per_province: PER_ADDR_RULE,
//       per_municipality: PER_ADDR_RULE,
//       per_barangay: PER_ADDR_RULE,

//       app_tel_no: validationRequiredNum,
//       app_mobile_no: validationRequiredNum,
//       app_email_addr: validationEmail,