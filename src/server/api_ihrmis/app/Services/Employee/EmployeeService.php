<?php
namespace App\Services\Employee;

use App\Models\Employees\TblemployeeCseligibilities;
use App\Models\Employees\TblemployeeEducations;
use App\Models\Employees\TblemployeeExperiences;
use App\Models\Employees\TblemployeeReferences;
use App\Models\Employees\TblemployeeTrainings;
use App\Models\Employees\TblemployeeVoluntaryWorks;
use GuzzleHttp\Psr7\Request;

class EmployeeService {
    public function addUpdateReference($request, $refId = NULL){    
        try {
            if($refId != NULL){
                $reference = TblemployeeReferences::where("ref_id", $refId)->first();
                $reference->ref_emp_id = $request->ref_app_id;
                $reference->ref_emp_name = $request->ref_app_name;
                $reference->ref_emp_email = $request->ref_app_email;
                $reference->ref_emp_addr = $request->ref_app_addr;
                $reference->ref_emp_tel_no = $request->ref_app_tel_no;
                $reference->save();
                return response()->json([
                    "message" => "Successfully Updated!"
                ], 200);
            }

            $reference = new TblemployeeReferences();
            $reference->ref_emp_id = $request->ref_app_id;
            $reference->ref_emp_name = $request->ref_app_name;
            $reference->ref_emp_email = $request->ref_app_email;
            $reference->ref_emp_addr = $request->ref_app_addr;
            $reference->ref_emp_tel_no = $request->ref_app_tel_no;
            $reference->save();
            return response()->json([
                "message" => "Successfully Added"
            ], 200);

        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "message" => "Bad Request, Try again later",
                "error"=> $th
            ], 400);
        }
    } 

    public function addUpdateTraining($request, $trnId = NULL){
        try {
            if($trnId != NULL){
                $training = TblemployeeTrainings::where("trn_id", $trnId)->first();
                $training->trn_emp_id = $request->trn_app_id;
                $training->trn_emp_title = $request->trn_app_title;
                $training->trn_emp_from = $request->trn_app_from;
                $training->trn_emp_to = $request->trn_app_to;
                $training->trn_emp_hours = $request->trn_app_hours;
                $training->trn_emp_type = $request->trn_app_type;
                $training->trn_emp_sponsor = $request->trn_app_sponsor;
                $training->trn_emp_cmptncy = $request->trn_app_cmptncy;
                $training->save();
                return response()->json([
                    "message" => "Successfully Updated!"
                ], 200);
            }

            $training = new TblemployeeTrainings();
            $training->trn_emp_id = $request->trn_app_id;
            $training->trn_emp_title = $request->trn_app_title;
            $training->trn_emp_from = $request->trn_app_from;
            $training->trn_emp_to = $request->trn_app_to;
            $training->trn_emp_hours = $request->trn_app_hours;
            $training->trn_emp_type = $request->trn_app_type;
            $training->trn_emp_sponsor = $request->trn_app_sponsor;
            $training->trn_emp_cmptncy = $request->trn_app_cmptncy;
            $training->save();
            return response()->json([
                "message" => "Successfully Added"
            ], 200);

        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "message" => "Bad Request, Try again later",
                "error"=> $th
            ], 400);
        }
    }

    public function addUpdateVoluntary($request, $volId = NULL){
        try {
            if($volId != NULL){
                $voluntary = TblemployeeVoluntaryWorks::where("vol_id", $volId)->first();
                $voluntary->vol_emp_id = $request->vol_app_id;
                $voluntary->vol_emp_org = $request->vol_app_org;
                $voluntary->vol_emp_addr = $request->vol_app_addr;
                $voluntary->vol_emp_from = $request->vol_app_from;
                $voluntary->vol_emp_to = $request->vol_app_to;
                $voluntary->vol_emp_hours = $request->vol_app_hours;
                $voluntary->vol_emp_work = $request->vol_app_work;
                $voluntary->save();
                return response()->json([
                    "message" => "Successfully Updated!"
                ], 200);
            }

            $voluntary = new TblemployeeVoluntaryWorks();
            $voluntary->vol_emp_id = $request->vol_app_id;
            $voluntary->vol_emp_org = $request->vol_app_org;
            $voluntary->vol_emp_addr = $request->vol_app_addr;
            $voluntary->vol_emp_from = $request->vol_app_from;
            $voluntary->vol_emp_to = $request->vol_app_to;
            $voluntary->vol_emp_hours = $request->vol_app_hours;
            $voluntary->vol_emp_work = $request->vol_app_work;
            $voluntary->save();
            return response()->json([
                "message" => "Successfully Added"
            ], 200);

        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "message" => "Bad Request, Try again later",
                "error"=> $th
            ], 400);
        }
    }

    public function addUpdateExperience($request, $expId = NULL){
        try {
            if($expId != NULL){
                $work = TblemployeeExperiences::where("exp_id", $expId)->first();
                $work->exp_emp_id = $request->exp_app_id;
                $work->exp_emp_from = $request->exp_app_from;
                $work->exp_emp_to = $request->exp_app_to;
                $work->exp_emp_position = $request->exp_app_position;
                $work->exp_emp_agency = $request->exp_app_agency;
                $work->exp_emp_grade = $request->exp_app_grade;
                $work->exp_emp_step = $request->exp_app_step;
                $work->exp_emp_salary = $request->exp_app_salary;
                $work->exp_emp_appntmnt = $request->exp_app_appntmnt;
                $work->exp_emp_govt = $request->exp_app_govt;
                $work->exp_emp_rel_fields = $request->exp_app_rel_fields;
                $work->save();
                return response()->json([
                    "message" => "Successfully Updated!"
                ], 200);
            }

            $work = new TblemployeeExperiences();
            $work->exp_emp_id = $request->exp_app_id;
            $work->exp_emp_from = $request->exp_app_from;
            $work->exp_emp_to = $request->exp_app_to;
            $work->exp_emp_position = $request->exp_app_position;
            $work->exp_emp_agency = $request->exp_app_agency;
            $work->exp_emp_grade = $request->exp_app_grade;
            $work->exp_emp_step = $request->exp_app_step;
            $work->exp_emp_salary = $request->exp_app_salary;
            $work->exp_emp_appntmnt = $request->exp_app_appntmnt;
            $work->exp_emp_govt = $request->exp_app_govt;
            $work->exp_emp_rel_fields = $request->exp_app_rel_fields;
            $work->save();
            return response()->json([
                "message" => "Successfully Added"
            ], 200);

        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "message" => "Bad Request, Try again later",
                "error"=> $th
            ], 400);
        }
    }

    public function addUpdateEligibility($request, $cseId = NULL){
        try {
            if($cseId != NULL){
                $eligibility = TblemployeeCseligibilities::where("cse_id", $cseId)->first();
                $eligibility->cse_emp_id = $request->cse_app_id;
                $eligibility->cse_emp_title = $request->cse_app_title['value'];
                $eligibility->cse_emp_date = $request->cse_app_date;
                $eligibility->cse_emp_place = $request->cse_app_place;
                $eligibility->cse_emp_rating = $request->cse_app_rating;
                $eligibility->cse_emp_license = $request->cse_app_license;
                $eligibility->cse_emp_validity = $request->cse_app_validity;
                $eligibility->save();
                return response()->json([
                    "message" => "Successfully Updated!"
                ], 200);
            }

            $eligibility = new TblemployeeCseligibilities();
            $eligibility->cse_emp_id = $request->cse_app_id;
            $eligibility->cse_emp_title = $request->cse_app_title['value'];
            $eligibility->cse_emp_date = $request->cse_app_date;
            $eligibility->cse_emp_place = $request->cse_app_place;
            $eligibility->cse_emp_rating = $request->cse_app_rating;
            $eligibility->cse_emp_license = $request->cse_app_license;
            $eligibility->cse_emp_validity = $request->cse_app_validity;
            $eligibility->save();
            return response()->json([
                "message" => "Successfully Added"
            ], 200);

        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "message" => "Bad Request, Try again later",
                "error"=> $th
            ], 400);
        }
    }

    public function addUpdateEducation($request, $eduId = NULL){
        try {
            if($eduId != NULL){
                $education = TblemployeeEducations::where("edu_id", $eduId)->first();
                $education->edu_emp_id = $request->edu_app_id;
                $education->edu_emp_level = $request->edu_app_level;
                $education->edu_emp_school = $request->edu_app_school;
                $education->edu_emp_from = $request->edu_app_from;
                $education->edu_emp_to = $request->edu_app_to;
                $education->edu_emp_degree = $request->edu_app_degree;
                $education->edu_emp_graduated = $request->edu_app_graduated;
                $education->edu_emp_units = $request->edu_app_units;
                $education->edu_emp_honors = $request->edu_app_honors;
                $education->save();
                return response()->json([
                    "message" => "Successfully Updated!"
                ], 200);
            }

            $education = new TblemployeeEducations();
            $education->edu_emp_id = $request->edu_app_id;
            $education->edu_emp_level = $request->edu_app_level;
            $education->edu_emp_school = $request->edu_app_school;
            $education->edu_emp_from = $request->edu_app_from;
            $education->edu_emp_to = $request->edu_app_to;
            $education->edu_emp_degree = $request->edu_app_degree;
            $education->edu_emp_graduated = $request->edu_app_graduated;
            $education->edu_emp_units = $request->edu_app_units;
            $education->edu_emp_honors = $request->edu_app_honors;
            $education->save();
            return response()->json([
                "message" => "Successfully Added"
            ], 200);

        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "message" => "Bad Request, Try again later",
                "error"=> $th
            ], 400);
        }
    }
}