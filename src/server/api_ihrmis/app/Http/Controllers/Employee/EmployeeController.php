<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Http\Resources\Employee\GetEmployeeCseEligibilityResource;
use App\Http\Resources\Employee\GetEmployeeEducationsResource;
use App\Http\Resources\Employee\GetEmployeeExperienceResource;
use App\Http\Resources\Employee\GetEmployeeReferenceResource;
use App\Http\Resources\Employee\GetEmployeeResource;
use App\Http\Resources\Employee\GetEmployeeTrainingResource;
use App\Http\Resources\Employee\GetEmployeeVoluntaryResource;
use App\Models\Employees\TblemployeeCseligibilities;
use App\Models\Employees\TblemployeeEducations;
use App\Models\Employees\TblemployeeExperiences;
use App\Models\Employees\TblemployeeReferences;
use App\Models\Employees\Tblemployees;
use App\Models\Employees\TblemployeeServiceHistory;
use App\Models\Employees\TblemployeeTrainings;
use App\Models\Employees\TblemployeeVoluntaryWorks;
use App\Services\Employee\EmployeeService;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function __construct() {
        $this->serviceInjector = new EmployeeService();
    }
    
    public function getAllEmployee(){
        $empQry = Tblemployees::with(["plantilla" => function($q){
            $q->with("tbloffices", "tblpositions");
        }, "serviceHistory"])->get();
      
        return GetEmployeeResource::collection($empQry);
    }

    public function getSingleEmployee($id){
        $empQry = Tblemployees::with(["plantilla" => function($q){
            $q->with("tbloffices", "tblpositions");
        }, 'profile', "serviceHistory", "family", "children"])->find($id);
        return new CommonResource($empQry);
    }
    /**
     * EMPLOYEE REFERENCE
     */
    public function addUpdateReference(Request $request, $ref_id = NULL){
        return $this->serviceInjector->addUpdateReference($request, $ref_id);
    }

    public function getEmployeeReference($emp_id){
        return GetEmployeeReferenceResource::collection(TblemployeeReferences::where('ref_emp_id', $emp_id)->get());
    }

    public function removeEmployeeReference($ref_id){
        try {
            return TblemployeeReferences::where('ref_id', $ref_id)->delete();
            return response()->json(['message' => "Deleted Successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to process the request please try again later.", "error" => $th], 400);
        }  
    }
    /**
     * EMPLOYEE TRAINING
     */
    public function addUpdateTraining(Request $request, $trn_id = NULL) {
        return $this->serviceInjector->addUpdateTraining($request, $trn_id);
    }

    public function getEmployeeTraining($emp_id){
        return GetEmployeeTrainingResource::collection(TblemployeeTrainings::where('trn_emp_id', $emp_id)->get());
    }

    public function removeEmployeeTraining($trn_id){  
        try {
            return TblemployeeTrainings::where('trn_id', $trn_id)->delete();
            return response()->json(['message' => "Deleted Successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to process the request please try again later.", "error" => $th], 400);
        }
    }
    /**
     * EMPLOYEE VOLUNTARY WORK
     */
    public function addUpdateVoluntary(Request $request, $vol_id = NULL) {
        return $this->serviceInjector->addUpdateVoluntary($request, $vol_id);
    }

    public function getEmployeeVoluntary($emp_id){
        return GetEmployeeVoluntaryResource::collection(TblemployeeVoluntaryWorks::where('vol_emp_id', $emp_id)->get());
    }

    public function removeEmployeeVoluntary($vol_id){
        try {
            return TblemployeeVoluntaryWorks::where('vol_id', $vol_id)->delete();
            return response()->json(['message' => "Deleted Successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to process the request please try again later.", "error" => $th], 400);
        }
    }
    /**
     * EMPLOYEE EXPERIENCES
     */
    public function addUpdateExperience(Request $request, $exp_id = NULL) {
        return $this->serviceInjector->addUpdateExperience($request, $exp_id);
    }

    public function getEmployeeExperience($emp_id){
        return GetEmployeeExperienceResource::collection(TblemployeeExperiences::where('exp_emp_id', $emp_id)->get());
    }

    public function removeEmployeeExperience($exp_id){
        try {
            return TblemployeeExperiences::where('exp_id', $exp_id)->delete();
            return response()->json(['message' => "Deleted Successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to process the request please try again later.", "error" => $th], 400);
        }
    }

    /**
     * EMPLOYEE CS ELIGIBILITY
     */
    public function addUpdateEligibility(Request $request, $cse_id = NULL) {
        return $this->serviceInjector->addUpdateEligibility($request, $cse_id);
    }

    public function getEmployeeEligibility($emp_id){
        return GetEmployeeCseEligibilityResource::collection(TblemployeeCseligibilities::where('cse_emp_id', $emp_id)->get());
    }

    public function removeEmployeeEligibility($cse_id){
        try {
            return TblemployeeCseligibilities::where('cse_id', $cse_id)->delete();
            return response()->json(['message' => "Deleted Successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to process the request please try again later.", "error" => $th], 400);
        }
    }

    /**
     * EMPLOYEE EDUCATION
     */
    public function addUpdateEducation(Request $request, $edu_id = NULL) {
        return $this->serviceInjector->addUpdateEducation($request, $edu_id);
    }

    public function getEmployeeEducation($emp_id){
        return GetEmployeeEducationsResource::collection(TblemployeeEducations::where('edu_emp_id', $emp_id)->get());
    }

    public function removeEmployeeEducation($edu_id){
        try {
            TblemployeeEducations::where('edu_id', $edu_id)->delete();
            return response()->json(['message' => "Deleted Successfully"], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to process the request please try again later.", "error" => $th], 400);
        }
    }

    /**
     * EMPLOYEE STATUS
     */
    public function addUpdateEmployeeHistoryService(Request $request, $id = NULL){
        if($id !== NULL){
            $query = TblemployeeServiceHistory::findOrFail($id);
            $query->svc_remarks = $request->svc_remarks;
            $query->svc_status = $request->svc_status;
            $query->svc_remarks = $request->svc_remarks;
            $query->svc_status = $request->svc_status;
            $query->svc_remarks = $request->svc_remarks;
            $query->svc_status = $request->svc_status;
            $query->save();
            return response()->json([
                "message" => "Successfully Updated!"
            ], 200);
        }

        $query = new TblemployeeServiceHistory();
        $query->svc_remarks = $request->svc_remarks;
        $query->svc_status = $request->svc_status;
        $query->svc_remarks = $request->svc_remarks;
        $query->svc_status = $request->svc_status;
        $query->svc_remarks = $request->svc_remarks;
        $query->svc_status = $request->svc_status;
        $query->save();
        return response()->json([
            "message" => "Successfully Updated!"
        ], 200);
    }

    public function getEmployeeHistoryService($id = NULL){
        try {
            if($id === NULL){
                $qryHistoryService = TblemployeeServiceHistory::all();
                return CommonResource::collection($qryHistoryService);
            }
            $qryHistoryService = TblemployeeServiceHistory::where("svc_emp_id", $id)->first();
            return new CommonResource($qryHistoryService);
            
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Failed to load the request, Try again later"
            ], 400);
        }
        
    }

}
