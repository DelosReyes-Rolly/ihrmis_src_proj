<?php
namespace App\Services\Applicant;

use App\Models\Applicants\TblapplicantsProfile;
use Illuminate\Http\Request;

class ApplicantProfileService {

  public function createApplicant($request)
  {
    $request->validate( [
      'app_nm_last' => 'required|alpha|max:50|regex:/^[\pL\s\-]+$/u',
      'app_nm_first' => 'required|alpha|max:50|regex:/^[\pL\s\-]+$/u',
      'app_nm_mid' => 'required|alpha|max:50',
      'app_birth_date' => 'required|date_format:Y-m-d|before:today',
      'app_birth_place' => 'required',
      // 'app_sex' => 'required',
      // 'app_blood_type' => 'required',
      // 'app_civil_status' => 'required',

      'app_civil_others' => 'required_if:app_civil_status,OT',
      
      'app_height' => 'required|numeric',
      'app_weight' => 'required|numeric',
          
      'app_emp_no' => 'required|alpha_num',
      'app_gsis' => 'required|alpha_num',
      'app_pagibig' => 'required|alpha_num',
      'app_philhealth' => 'required|alpha_num',
      'app_sss' => 'required|alpha_num',
      'app_tin' => 'required|alpha_num',

      'app_filipino' => 'required',
      'app_dual_cny_id' => 'required_if:app_filipino,0',
      'app_dual_type' => 'required_if:is_dual_citizen,1',
      
      'res_block_lot' => 'required',
      'res_street' => 'required',
      'res_sub_village' => 'required',
      'res_zip_code' => 'required',
      'res_barangay' => 'required',
      'res_municipality' => 'required',
      'res_province' => 'required',

      'per_block_lot' => 'required_if:copied_addr,false',
      'per_street' => 'required_if:copied_addr,false',
      'per_sub_village' => 'required_if:copied_addr,false',
      'per_zip_code' => 'required_if:copied_addr,false',
      'per_barangay' => 'required_if:copied_addr,false',
      'per_municipality' => 'required_if:copied_addr,false',
      'per_province' => 'required_if:copied_addr,false',

      'app_tel_no' => 'required|numeric',
      'app_mobile_no' => 'required|numeric',
      'app_email_addr' => 'required|email:rfc',
    ], [
        'required' => 'This field is required.',
        'required_if' => 'This field is required.',
        'numeric' => 'Invalid input.',
        'alpha' => 'Invalid input.',
        'alpha_num' => 'Invalid input.'
    ]);

    //IMPLODING ADDRESSES
    $fullAddress = [];
    array_push($fullAddress, $request->res_block_lot);
    array_push($fullAddress, $request->res_street);
    array_push($fullAddress, $request->res_sub_village);
    array_push($fullAddress, $request->res_zip_code);
    array_push($fullAddress, $request->res_barangay);
    array_push($fullAddress, $request->res_municipality);
    array_push($fullAddress, $request->res_province);

    $address = implode(", ", $fullAddress);

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
    if($request->app_civil_status == "OT"){
        $applicantData->app_civil_others = $request->app_civil_others;
    } else{
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

    if($request->app_filipino == 1){

        if($request->is_dual_type == 1){
            $applicantData->app_dual_type = $request->app_dual_type;
        } else {
            $applicantData->app_dual_type = 0;
        }
        $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "NA";

    } else if($request->app_filipino == 0){

        $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "AF";
        $applicantData->app_dual_type = 0;
    }
    
    
    //ADDRESS INFO
    if($request->boolean('copied_addr') == false){
        $perAddrssArr = [];
        array_push($perAddrssArr, $request->per_block_lot);
        array_push($perAddrssArr, $request->per_street);
        array_push($perAddrssArr, $request->per_sub_village);
        array_push($perAddrssArr, $request->per_zip_code);
        array_push($perAddrssArr, $request->per_barangay);
        array_push($perAddrssArr, $request->per_municipality);
        array_push($perAddrssArr, $request->per_province); 
        $perAddress = implode(", ", array_filter($perAddrssArr));

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

  public function modifyApplicant($id, $request){
    $request->validate( [
      'app_nm_last' => 'required|alpha|max:50|regex:/^[\pL\s\-]+$/u',
      'app_nm_first' => 'required|alpha|max:50|regex:/^[\pL\s\-]+$/u',
      'app_nm_mid' => 'required|alpha|max:50',
      'app_birth_date' => 'required|date_format:Y-m-d|before:today',
      'app_birth_place' => 'required',
      // 'app_sex' => 'required',
      // 'app_blood_type' => 'required',
      // 'app_civil_status' => 'required',

      'app_civil_others' => 'required_if:app_civil_status,OT',
      
      'app_height' => 'required|numeric',
      'app_weight' => 'required|numeric',
          
      'app_emp_no' => 'required|alpha_num',
      'app_gsis' => 'required|alpha_num',
      'app_pagibig' => 'required|alpha_num',
      'app_philhealth' => 'required|alpha_num',
      'app_sss' => 'required|alpha_num',
      'app_tin' => 'required|alpha_num',

      'app_filipino' => 'required',
      'app_dual_cny_id' => 'required_if:app_filipino,0',
      'app_dual_type' => 'required_if:is_dual_citizen,1',
      
      'res_block_lot' => 'required',
      'res_street' => 'required',
      'res_sub_village' => 'required',
      'res_zip_code' => 'required',
      'res_barangay' => 'required',
      'res_municipality' => 'required',
      'res_province' => 'required',

      'per_block_lot' => 'required_if:copied_addr,false',
      'per_street' => 'required_if:copied_addr,false',
      'per_sub_village' => 'required_if:copied_addr,false',
      'per_zip_code' => 'required_if:copied_addr,false',
      'per_barangay' => 'required_if:copied_addr,false',
      'per_municipality' => 'required_if:copied_addr,false',
      'per_province' => 'required_if:copied_addr,false',

      'app_tel_no' => 'required|numeric',
      'app_mobile_no' => 'required|numeric',
      'app_email_addr' => 'required|email:rfc',
    ], [
        'required' => 'This field is required.',
        'required_if' => 'This field is required.',
        'numeric' => 'Invalid input.',
        'alpha' => 'Invalid input.',
        'alpha_num' => 'Invalid input.'
    ]);

    //IMPLODING ADDRESSES
    $fullAddress = [];
    array_push($fullAddress, $request->res_block_lot);
    array_push($fullAddress, $request->res_street);
    array_push($fullAddress, $request->res_sub_village);
    array_push($fullAddress, $request->res_zip_code);
    array_push($fullAddress, $request->res_barangay);
    array_push($fullAddress, $request->res_municipality);
    array_push($fullAddress, $request->res_province);

    $address = implode(", ", $fullAddress);

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
    if($request->app_civil_status == "OT"){
        $applicantData->app_civil_others = $request->app_civil_others;
    } else{
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

    if($request->app_filipino == 1){
        if($request->is_dual_citizen == 1){
            $applicantData->app_dual_type = $request->app_dual_type;
        } else {
            $applicantData->app_dual_type = 0;
        }
        $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "NA";

    } else if($request->app_filipino == 0){
        $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "AF";
        $applicantData->app_dual_type = 0;
    }
    
    
    //ADDRESS INFO
    if($request->boolean('copied_addr') == false){
        $perAddrssArr = [];
        array_push($perAddrssArr, $request->per_block_lot);
        array_push($perAddrssArr, $request->per_street);
        array_push($perAddrssArr, $request->per_sub_village);
        array_push($perAddrssArr, $request->per_zip_code);
        array_push($perAddrssArr, $request->per_barangay);
        array_push($perAddrssArr, $request->per_municipality);
        array_push($perAddrssArr, $request->per_province); 
        $perAddress = implode(", ", array_filter($perAddrssArr));

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
    // $applicantData->app_id_issued = $request->app_id_issued ?? "NA";
    // $applicantData->app_id_no = $request->app_id_no ?? "NA";
    // $applicantData->app_id_dateplace = $request->app_id_dateplace ?? "NA";
    // $applicantData->app_agree = $request->app_agree ?? 0;

    $applicantData->save();

    return $id;
  }

}