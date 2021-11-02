<?php

use App\Http\Controllers\JvsCompetencyController;
use App\Http\Controllers\JvscrwMainController;
use App\Http\Controllers\TblapplicantCseligibilitiesController;
use App\Http\Controllers\TblapplicantEducationsController;
use App\Http\Controllers\TblapplicantExperiencesController;
use App\Http\Controllers\TblapplicantsController;
use App\Http\Controllers\TblapplicantsProfileController;
use App\Http\Controllers\TblapplicantTrainingsController;
use App\Http\Controllers\TblapplicantVoluntaryWorkController;
use App\Http\Controllers\TblofficesController;
use App\Http\Controllers\TblplantillaItemsController;
use App\Http\Controllers\TblpositionsController;
use App\Models\Applicants\TblapplicantExperiences;
use App\Models\Applicants\TblapplicantsProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//=======================================================================================
// APPLICANTS ENDPOINTS
//=======================================================================================
Route::post('new-applicant', [TblapplicantsProfileController::class, "createApplicant"]);
Route::post('new-afc/{id}', [TblapplicantsProfileController::class, "createFamilyChildren"]);
Route::get('verify-email', [TblapplicantsProfileController::class, "verifyEmail"]);
//add-educ
Route::post('new-education/{id}', [TblapplicantEducationsController::class, "addEducationRecord"]);
Route::get('new-education/{id}', [TblapplicantEducationsController::class, "getEducationRecord"]);
Route::delete('new-education/{id}', [TblapplicantEducationsController::class, "removeEducationRecord"]);
//add-csc
Route::get('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "getCseligibilityRecord"]);
Route::post('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "addCseligibilityRecord"]);
Route::delete('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "removeCseligibilityRecord"]);
//add-exp
Route::get('new-work-experience/{id}', [TblapplicantExperiencesController::class, "getExperienceRecord"]);
Route::post('new-work-experience/{id}', [TblapplicantExperiencesController::class, "addExperienceRecord"]);
Route::delete('new-work-experience/{id}', [TblapplicantExperiencesController::class, "removeExperienceRecord"]);

// Route::resource('new-training/{id}', TblapplicantTrainingsController::class);
// Route::resource('new-vol-work/{id}', TblapplicantVoluntaryWorkController::class);
// Route::resource('new-experiences/{id}', TblapplicantExperiencesController::class);
// Route::resource('new-experiences/{id}', TblapplicantCseligibilitiesController::class);


//=======================================================================================
// JVSCRW ENDPOINTS
//=======================================================================================
Route::post('jvscrw/{id}', [JvscrwMainController::class, "writeJvs"]);
Route::get('jvscrw/{id}', [JvscrwMainController::class, "show"]);


// Route::resource('jvscrw/{id}', JvscrwMainController::class);
// Route::get('competency/{jvs_id}', [JvsCompetencyController::class, "updateCompetency"]);




Route::get('office-position', [TblplantillaItemsController::class, "officePosition"]);
Route::resource('plantilla-items', TblplantillaItemsController::class);
Route::resource('offices', TblofficesController::class);
Route::resource('positions', TblpositionsController::class);
Route::resource('positions-csc-std', TblpositionsController::class);