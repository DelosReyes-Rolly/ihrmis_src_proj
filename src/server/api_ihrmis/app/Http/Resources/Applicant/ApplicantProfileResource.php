<?php

namespace App\Http\Resources\Applicant;

use Illuminate\Http\Resources\Json\JsonResource;

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
        $resAddressArry = explode(", ", $this->app_resident_addr);
        $perAddressArry = explode(", ", $this->app_permanent_addr);
        $id_no_str = "";
        $id_issued_str ="";
        $id_dateplace_str ="";
        if ($this->app_id_issued != 'NA' && $this->app_id_dateplace != 'NA' && $this->app_id_no != 'NA'){
            $id_issued_str = $this->app_id_issued;
            $id_no_str = $this->app_id_no;
            $id_dateplace_str =  $this->app_id_dateplace;
        } 
        $isDualBool = 1;
        if($this->app_dual_type === 0) {
            $isDualBool = 0;
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
            'is_dual_citizen' => $isDualBool ?? "",

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
