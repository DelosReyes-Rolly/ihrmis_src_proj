<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantChildren;
use App\Models\Applicants\TblapplicantsFamily;
use App\Models\Applicants\TblapplicantsProfile;
use Hamcrest\Core\IsNot;
use Illuminate\Http\Request;

class TblapplicantsController extends Controller
{   
    protected $idKey;

    public function index()
    {
      
    }

    // public function createApplicant(Request $request)
    // {

        // $request->validate([
            
        //     'app_emp_no' => 'required',
        //     'app_nm_last' => 'required',
        //     'app_nm_first' => 'required',
        //     'app_nm_mid' => 'required',
        //     'app_nm_extn' => 'required',
        //     'app_birth_date' => 'required',
        //     'app_birth_place' => 'required',
        //     'app_sex' => 'required',
        //     'app_blood_type' => 'required',
        //     'app_civil_status' => 'required',
        //     'app_civil_others' => 'required',
        //     'app_height' => 'required',
        //     'app_weight' => 'required',
        //     'app_gsis' => 'required',
        //     'app_pagibig' => 'required',
        //     'app_philhealth' => 'required',
        //     'app_sss' => 'required',
        //     'app_tin' => 'required',
        //     'app_filipino' => 'required',
        //     'app_dual_type' => 'required',
        //     'app_dual_cny_id' => 'required',
        //     'app_resident_addr' => 'required',

        //     'res_block_lot' => 'required',
        //     'res_street' => 'required',
        //     'res_sub_village' => 'required',
        //     'res_zip_code' => 'required',
        //     'res_barangay' => 'required',
        //     'res_municipality' => 'required',
        //     'res_province' => 'required',

        //     'app_tel_no' => 'required',
        //     'app_mobile_no' => 'required',
        //     'app_email_addr' => 'required',
        //     'app_id_issued' => 'required',
        //     'app_id_no' => 'required',
        //     'app_id_dateplace' => 'required',
        //     'app_agree' => 'required',
        // ]);

        // // $perAddrssArr = [];
        // // if($request->copied_addr == "hello"){
        // //     $request->validate([
        // //         'per_block_lot' => 'required',
        // //         'per_street' => 'required',
        // //         'per_sub_village' => 'required',
        // //         'per_zip_code' => 'required',
        // //         'per_barangay' => 'required',
        // //         'per_municipality' => 'required',
        // //         'per_province' => 'required',
        // //     ]);
        // //     array_push($perAddrssArr, $request->per_block_lot);
        // //     array_push($perAddrssArr, $request->per_street);
        // //     array_push($perAddrssArr, $request->per_sub_village);
        // //     array_push($perAddrssArr, $request->per_zip_code);
        // //     array_push($perAddrssArr, $request->per_barangay);
        // //     array_push($perAddrssArr, $request->per_municipality);
        // //     array_push($perAddrssArr, $request->per_province); 
        // // }

        // // $perAddress = implode(", ", array_filter($perAddrssArr));
        
        // //IMPLODING ADDRESSES
        // $fullAddress = [];
        // array_push($fullAddress, $request->res_block_lot);
        // array_push($fullAddress, $request->res_street);
        // array_push($fullAddress, $request->res_sub_village);
        // array_push($fullAddress, $request->res_zip_code);
        // array_push($fullAddress, $request->res_barangay);
        // array_push($fullAddress, $request->res_municipality);
        // array_push($fullAddress, $request->res_province);
        // $address = implode(", ", $fullAddress);


        // $applicantData = new TblapplicantsProfile();
        // //USER INFO
        // $applicantData->app_nm_last = $request->app_nm_last;
        // $applicantData->app_nm_mid = $request->app_nm_mid;
        // $applicantData->app_nm_extn = $request->app_nm_extn;
        // $applicantData->app_birth_date = $request->app_birth_date;
        // $applicantData->app_birth_place = $request->app_birth_place;
        // $applicantData->app_sex = $request->app_sex;
        // $applicantData->app_blood_type = $request->app_blood_type;
        // $applicantData->app_civil_status = $request->app_civil_status;
        // $applicantData->app_civil_others = $request->app_civil_others;
        // $applicantData->app_height = $request->app_height;
        // $applicantData->app_weight = $request->app_weight;

        // //EMPLOYMENT INFO
        // $applicantData->app_emp_no = $request->app_emp_no ?? 1;
        // $applicantData->app_gsis = $request->app_gsis;
        // $applicantData->app_pagibig = $request->app_pagibig;
        // $applicantData->app_philhealth = $request->app_philhealth;
        // $applicantData->app_sss = $request->app_sss;
        // $applicantData->app_tin = $request->app_tin;

        // //CITIZENSHIP INFO
        // $applicantData->app_filipino = $request->app_filipino;
        // $applicantData->app_dual_type = $request->app_dual_type;
        // $applicantData->app_dual_cny_id = $request->app_dual_cny_id;
        
        // //ADDRESS INFO
        // $applicantData->app_resident_addr = $address;
        // $applicantData->app_permanent_addr = $address;

        // //CONTACT INFO
        // $applicantData->app_tel_no = $request->app_tel_no;
        // $applicantData->app_mobile_no = $request->app_mobile_no;
        // $applicantData->app_email_addr = $request->app_email_addr;
        
        // //ID INFO
        // $applicantData->app_id_issued = $request->app_id_issued;
        // $applicantData->app_id_no = $request->app_id_no;
        // $applicantData->app_id_dateplace = $request->app_id_dateplace;
        // $applicantData->app_agree = $request->app_agree ?? 1;

        // $applicantData->save();

    //     return response()->json([
    //         // 'item' => $applicantData->id,
    //         'status' => 200,
    //         'message' => "Added Successfully",
    //     ]);
            
        
    // }

    public function createFamilyChildren($id, Request $request)
    {
        
        $familyApplicant = TblapplicantsFamily::create([
            'app_id' => $id, 
            'app_sps_nm_last' => $request->app_sps_nm_last,
            'app_sps_nm_first' => $request->app_sps_nm_first,
            'app_sps_nm_mid' => $request->app_sps_nm_mid,
            'app_sps_nm_extn' => $request->app_sps_nm_extn ?? 'NA',
            'app_sps_occupation' => $request->app_sps_occupation,
            'app_sps_bus_name' => $request->app_sps_bus_name,
            'app_sps_bus_addr' => $request->app_sps_bus_addr,
            'app_sps_tel_no' => $request->app_sps_tel_no,
    
            'app_fthr_nm_last' => $request->app_fthr_nm_last,
            'app_fthr_nm_first' => $request->app_fthr_nm_first,
            'app_fthr_nm_mid' => $request->app_fthr_nm_mid,
            'app_fthr_nm_extn' => $request->app_fthr_nm_extn ?? 'NA',
    
            'app_mthr_nm_last' => $request->app_mthr_nm_last,
            'app_mthr_nm_first' => $request->app_mthr_nm_first,
            'app_mthr_nm_mid' => $request->app_mthr_nm_mid,
            'app_mthr_nm_extn' => $request->app_mthr_nm_extn ?? 'NA',
        ]);

        if(isset($request->children)){
            
            foreach ($request->children as $value) {
                $children = new TblapplicantChildren();
                $children->chi_app_id = $id;
                $children->chi_app_name = $value['chi_app_name'];
                $children->chi_app_birthdate = date($value['chi_app_birthdate']);
                $children->save();
            }

            $familyApplicant->save();
        }

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

}
