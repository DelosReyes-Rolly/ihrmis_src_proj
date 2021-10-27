<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantChildren;
use App\Models\Applicants\TblapplicantsFamily;
use App\Models\Second\SecApplicantChildren;
use App\Models\Second\SecApplicantFamily;
use App\Models\Second\SecApplicantProfile;
use App\Models\Second\SecApplicantVerification;
use Illuminate\Http\Request;

class TblapplicantsProfileController extends Controller
{
    public function createApplicant(Request $request)
    {
        $request->validate([

            'app_nm_last' => 'required|alpha|max:50',
            'app_nm_first' => 'required|alpha|max:50',
            'app_nm_mid' => 'required|alpha|max:50',
            'app_birth_date' => 'required|date_format:Y-m-d|before:today',
            'app_birth_place' => 'required',
            'app_sex' => 'required',
            'app_blood_type' => 'required',
            'app_civil_status' => 'required',
            
            'app_height' => 'required|numeric',
            'app_weight' => 'required|numeric',
             
            'app_emp_no' => 'required|alpha_num',
            'app_gsis' => 'required|alpha_num',
            'app_pagibig' => 'required|alpha_num',
            'app_philhealth' => 'required|alpha_num',
            'app_sss' => 'required|alpha_num',
            'app_tin' => 'required|alpha_num',

            'app_filipino' => 'required',
        
            'res_block_lot' => 'required',
            'res_street' => 'required',
            'res_sub_village' => 'required',
            'res_zip_code' => 'required',
            'res_barangay' => 'required',
            'res_municipality' => 'required',
            'res_province' => 'required',

            'app_tel_no' => 'required|numeric',
            'app_mobile_no' => 'required|numeric',
            'app_email_addr' => 'required|email:rfc',
          
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


        $applicantData = new SecApplicantProfile();
        //USER INFO
        $applicantData->app_nm_last = $request->app_nm_last;
        $applicantData->app_nm_first = $request->app_nm_first;
        $applicantData->app_nm_mid = $request->app_nm_mid;
        $applicantData->app_nm_extn = $request->app_nm_extn ?? "N/A";
        $applicantData->app_birth_date = $request->app_birth_date;
        $applicantData->app_birth_place = $request->app_birth_place;
        $applicantData->app_sex = $request->app_sex;
        $applicantData->app_blood_type = $request->app_blood_type;
        $applicantData->app_civil_status = $request->app_civil_status;


        // CIVIL STATUS
        if($request->app_civil_status == "OT"){
            $request->validate([
                'app_civil_others' => 'required',
            ]);
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

            if($request->app_dual_type == "true"){
                $request->validate([
                    'app_dual_type' => 'required'
                ]);
                $applicantData->app_dual_type = $request->app_dual_type;
            } else {
                $applicantData->app_dual_type = 0;
            }
            $applicantData->app_dual_cny_id = $request->app_dual_cny_id ?? "NA";
        } else if($request->app_filipino == 0){
            $request->validate([
                'app_dual_cny_id' => 'required',
            ]);

            $applicantData->app_dual_cny_id = $request->app_dual_cny_id;
            $applicantData->app_dual_type = 0;
        }
        
        
        //ADDRESS INFO
        if($request->copied_addr == "false"){
            $request->validate([
                'per_block_lot' => 'required',
                'per_street' => 'required',
                'per_sub_village' => 'required',
                'per_zip_code' => 'required',
                'per_barangay' => 'required',
                'per_municipality' => 'required',
                'per_province' => 'required',
            ]);
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

        return response()->json([
            'item' => $applicantData->id,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
            
        
    }


    public function createFamilyChildren($id, Request $request)
    {
        
        $request->validate([
            'app_sps_nm_last' => 'required',
            'app_sps_nm_first' => 'required',
            'app_sps_nm_mid' => 'required',
            'app_sps_occupation' => 'required',
            'app_sps_bus_name' => 'required',
            'app_sps_bus_addr' => 'required',
            'app_sps_tel_no' => 'required',

            'app_fthr_nm_last' => 'required',
            'app_fthr_nm_first' => 'required',
            'app_fthr_nm_mid'  => 'required',
    
            'app_mthr_nm_last' => 'required',
            'app_mthr_nm_first' => 'required',
            'app_mthr_nm_mid' => 'required',
        ]);

        $familyApplicant = SecApplicantFamily::findOrNew($id);
        
        $familyApplicant->app_id = $id; 
        $familyApplicant->app_sps_nm_last = $request->app_sps_nm_last;
        $familyApplicant->app_sps_nm_first = $request->app_sps_nm_first;
        $familyApplicant->app_sps_nm_mid = $request->app_sps_nm_mid;
        $familyApplicant->app_sps_nm_extn = $request->app_sps_nm_extn ?? 'NA';
        $familyApplicant->app_sps_occupation = $request->app_sps_occupation;
        $familyApplicant->app_sps_bus_name = $request->app_sps_bus_name;
        $familyApplicant->app_sps_bus_addr = $request->app_sps_bus_addr;
        $familyApplicant->app_sps_tel_no = $request->app_sps_tel_no;

        $familyApplicant->app_fthr_nm_last = $request->app_fthr_nm_last;
        $familyApplicant->app_fthr_nm_first = $request->app_fthr_nm_first;
        $familyApplicant->app_fthr_nm_mid = $request->app_fthr_nm_mid;
        $familyApplicant->app_fthr_nm_extn = $request->app_fthr_nm_extn ?? 'NA';

        $familyApplicant->app_mthr_nm_last = $request->app_mthr_nm_last;
        $familyApplicant->app_mthr_nm_first = $request->app_mthr_nm_first;
        $familyApplicant->app_mthr_nm_mid = $request->app_mthr_nm_mid;
        $familyApplicant->app_mthr_nm_extn = $request->app_mthr_nm_extn ?? 'NA';

        if(isset($request->children)){
            SecApplicantChildren::destroy($id);
        
            foreach ($request->children as $value) {
                $children = new SecApplicantChildren();
                $children->chi_app_id = $id;
                $children->chi_app_name = $value['name'];
                $children->chi_app_birthdate = date($value['birthday']);
                $children->save();
            }

            
        }

        $familyApplicant->save();

        return response()->json([
            'item' => $id,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function verifyEmail(Request $request)
    {

        $verify = SecApplicantVerification::where('id_sec_applicant', $request->applicant)->first();

        if($verify != null){
            if($verify->token == $request->token){
                $setAsVerified = SecApplicantProfile::where('app_id', $request->applicant)->update(["is_verified" => 1]);
                // where('app_id', $request->applicant)->first(find($request->applicant)
                $verify->where('id_sec_applicant', $request->applicant)->delete();
                return redirect()->away(env('FRONTEND_APPLICANT_REDIRECT_URL') . $request->applicant);
            }
        } else {
            abort('404');
        }

    }



}


