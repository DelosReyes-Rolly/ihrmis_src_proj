<?php

use App\Http\Controllers\Applicant\TblapplicantChildrenController;
use App\Http\Controllers\Applicant\TblapplicantCseligibilitiesController;
use App\Http\Controllers\Applicant\TblapplicantDeclarationController;
use App\Http\Controllers\Applicant\TblapplicantDocumentRequirements;
use App\Http\Controllers\Applicant\TblapplicantEducationsController;
use App\Http\Controllers\Applicant\TblapplicantExperiencesController;
use App\Http\Controllers\Applicant\TblapplicantOtherInfoController;
use App\Http\Controllers\Applicant\TblapplicantProfileController;
use App\Http\Controllers\Applicant\TblapplicantReferencesController;
use App\Http\Controllers\Applicant\TblapplicantRequirementsController;
use App\Http\Controllers\Applicant\TblapplicantStatusController;
use App\Http\Controllers\Applicant\TblapplicantTrainingsController;
use App\Http\Controllers\Applicant\TblapplicantVoluntaryController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\Jvs\TbljvsController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TblofficesController;
use App\Http\Controllers\TblplantillaDtyAndRspnsbltyController;
use App\Http\Controllers\TblplantillaItemsController;
use App\Http\Controllers\TblplantillaItemsVacantPositionController;
use App\Http\Controllers\TblpositionsController;
use App\Http\Controllers\TblTransactionStagesController;
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
// APPLICANT ENDPOINTS
//=======================================================================================
Route::post('new-applicant/{position?}', [TblapplicantProfileController::class, "createApplicant"]);
Route::post('modify-applicant/{id?}', [TblapplicantProfileController::class, "modifyApplicant"]);
Route::post('new-afc/{id}', [TblapplicantProfileController::class, "createFamilyChildren"]);
Route::get('verify-email', [TblapplicantProfileController::class, "verifyEmail"]);
Route::get('get-new-applicant/{id?}', [TblapplicantProfileController::class, "getApplicant"]);
Route::get('get-new-family/{id}', [TblapplicantProfileController::class, "getFamilyChildren"]);
Route::get('get-complete-applicant/{id}', [TblapplicantProfileController::class, "getCompleteApplicantsProfile"]);
//Reports
Route::get('generate-POA/{plantillaId}', [TblapplicantProfileController::class, "generatePOAReport"]);
Route::get('generate-RAI/{month}/{year}', [TblapplicantProfileController::class, "generateRAIReport"]);
Route::get('generate-CM/{plantillaId}', [TblapplicantProfileController::class, "generateCMReport"]);
Route::get('generate-OOO/{applicant}', [TblapplicantProfileController::class, "generateOOOReport"]);
Route::get('generate-CAD/{applicant}', [TblapplicantProfileController::class, "generateCADReport"]);
//crud-child
Route::get('new-children/{id}', [TblapplicantChildrenController::class, "getChildrenRecord"]);
Route::post('new-children/{id}', [TblapplicantChildrenController::class, "addChildrenRecord"]);
Route::delete('new-children/{id}', [TblapplicantChildrenController::class, "removeChildrenRecord"]);
//crud-educ
Route::post('new-education/{id}', [TblapplicantEducationsController::class, "addEducationRecord"]);
Route::get('new-education/{id}', [TblapplicantEducationsController::class, "getEducationRecord"]);
Route::delete('new-education/{id}', [TblapplicantEducationsController::class, "removeEducationRecord"]);
//crud-csc
Route::get('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "getCseligibilityRecord"]);
Route::post('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "addCseligibilityRecord"]);
Route::delete('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "removeCseligibilityRecord"]);
//crud-exp
Route::get('new-work-experience/{id}', [TblapplicantExperiencesController::class, "getExperienceRecord"]);
Route::post('new-work-experience/{id}', [TblapplicantExperiencesController::class, "addExperienceRecord"]);
Route::delete('new-work-experience/{id}', [TblapplicantExperiencesController::class, "removeExperienceRecord"]);
//crud-vol
Route::get('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "getVoluntaryRecord"]);
Route::post('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "addVoluntaryRecord"]);
Route::delete('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "removeVoluntaryRecord"]);
//crud-trn
Route::get('new-training/{id}', [TblapplicantTrainingsController::class, "getTrainingRecord"]);
Route::post('new-training/{id}', [TblapplicantTrainingsController::class, "addTrainingRecord"]);
Route::delete('new-training/{id}', [TblapplicantTrainingsController::class, "removeTrainingRecord"]);
//crud-otr
Route::get('new-other-info/{id}', [TblapplicantOtherInfoController::class, "getOtherInfoRecord"]);
Route::post('new-other-info/{id}', [TblapplicantOtherInfoController::class, "addOtherInfoRecord"]);
Route::delete('new-other-info/{id}', [TblapplicantOtherInfoController::class, "removeOtherInfoRecord"]);
//crud-ref
Route::get('new-reference/{id}', [TblapplicantReferencesController::class, "getReferenceRecord"]);
Route::post('new-reference/{id}', [TblapplicantReferencesController::class, "addReferenceRecord"]);
Route::delete('new-reference/{id}', [TblapplicantReferencesController::class, "removeReferenceRecord"]);

//Info
Route::get('new-get-delcaration/{id}', [TblapplicantDeclarationController::class, "getDataDeclaration"]);
Route::post('new-declaration/{id}', [TblapplicantDeclarationController::class, "onSubmitDecleration"]);

//GOVERNMENT ID
Route::post('new-profile/{id}', [TblapplicantProfileController::class, "addGovernmentId"]);
Route::post('new-profile-image/{id}', [TblapplicantProfileController::class, "addimage"]);
//REQUIREMENTS
Route::post('new-requirement/{id}', [TblapplicantRequirementsController::class, "addDocuments"]);

//=======================================================================================
// JVSCRW END POINTS
//=======================================================================================
Route::get('jvscrw/{id}', [TbljvsController::class, "getPositionCscQualifation"]);
Route::get('jvscrw-rating/{id}', [TbljvsController::class, "readCompenencyAndRating"]);
Route::get('jvscrw-duty-responsibility/{id}', [TbljvsController::class, "readDutiesAndResponsibilities"]);
Route::get('jvscrw-get-jvs-ver/{itemId}', [TbljvsController::class, "allJvsVersion"]);
Route::get('get-signature-image/{id}', [TbljvsController::class, "getSignatureDisplay"]);

Route::get('get-generated-pdf/{id}', [TbljvsController::class, "generatedPdf"]);
Route::get('get-option-employee/{plantillaId}', [TbljvsController::class, "getEmployeeAsOption"]);
Route::get('new-jvs-version/{item}', [TbljvsController::class, "newVersion"]);

Route::post('jvscrw-competency-rating', [TbljvsController::class, "addCompetencyAndRating"]);
Route::post('jvscrw-sign-upload/{id}/type/{signType}', [TbljvsController::class, "saveSignature"]);
Route::post('save-generate-jvscrw', [TbljvsController::class, "saveSignaturesAndName"]);

Route::delete('remove-signed-image/{id}/{type}', [TbljvsController::class, "removeImage"]);



// Route::post('jvscrw/{id}', [TbljvsController::class, "getPositionCscQualifation"]);
// Route::post('jvscrw-competency-rating/{id}/sequence/{order?}', [TbljvsController::class, "addCompenencyAndRating"]);
// Route::resource('jvscrw/{id}', JvscrwMainController::class);
// Route::get('competency/{jvs_id}', [JvsCompetencyController::class, "updateCompetency"]);
// Route::post('jvscrw-duty-responsibility/{id}', [TbljvsController::class, "addDutiesAndResponsibilities"]);
// Competency
// Route::delete('jvscrw-rating/{id}/order/{order}/type/{type}',[TbljvsController::class, "removeCompetencyRating"]);
// SIGNATURE UPLOAD

//=======================================================================================
// POSITION AND OFFICE END POINTS
//=======================================================================================

Route::post('create-position', [TblpositionsController::class, "addPosition"]);
Route::get('get-position/{id}', [TblpositionsController::class, "getPosition"]);
Route::get('get-info-position/{id}', [TblpositionsController::class, "getPositionWithCsc"]);

//=======================================================================================
// PLANTILLA ITEM END POINTS
//=======================================================================================
Route::get('office-position', [TblplantillaItemsController::class, "officePosition"]);
Route::get('plantilla-items/{type}', [TblplantillaItemsController::class, "getPlantillaItem"]);
Route::get('get-plantilla-id/{id}', [TblplantillaItemsController::class, "getPlantillaItemById"]);
Route::get('plantilla-itm-detail/{id}', [TblplantillaItemsController::class, "showItemDetail"]);
Route::get('plantilla-duties-responsibility/{id}', [TblplantillaItemsController::class, "getDutiesAndResponsibility"]);
Route::get('get-plantilla-by-office/{id}', [TblplantillaItemsController::class, "getPlantillaItemByOffice"]);
Route::get('get-next-rank-/{id}', [TblplantillaItemsController::class, "getNextInRank"]);
Route::get('get-vacant-plantilla', [TblplantillaItemsController::class, "getAllVacantPlantillaItems"]);
Route::get('get-open-positions', [TblplantillaItemsController::class, "getOpenPlantillaItems"]);
Route::post('plantilla-items/{id}', [TblplantillaItemsController::class, "addPlantillaItem"]);

Route::delete("remove-plantilla/{id}", [TblplantillaItemsController::class, "removePlantilla"]);

//=======================================================================================
// PLANTILLA DTY RESPONSIBILITY
//=======================================================================================
Route::get('get-dty-items/{id}', [TblplantillaDtyAndRspnsbltyController::class, "getDtyRspnsblty"]);
Route::post('add-dty-items/{id}', [TblplantillaDtyAndRspnsbltyController::class, "addDutiesAndResponsibilities"]);

//=======================================================================================
// OTHER RESOURCES
//=======================================================================================
Route::resource('plantilla-items', TblplantillaItemsController::class);
Route::resource('offices', TblofficesController::class);
Route::post('save-agency', [TblofficesController::class, "saveAgency"]);
Route::resource('positions', TblpositionsController::class);
Route::resource('positions-csc-std', TblpositionsController::class);

//=======================================================================================
// AUTH END POINTS
//=======================================================================================
Route::post('login', [AuthenticationController::class, "loginUser"]);
Route::post('register', [AuthenticationController::class, "registerUser"]);
//=======================================================================================
// MAIL CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('mail-template/{type?}', [MailController::class, "getEmailTemplate"]);
Route::post('add_mail-template', [MailController::class, "addEmailTemplate"]);
Route::delete('delete-mail-template/{template_id}', [MailController::class, "deleteEmailTemplate"]);
Route::post('notify-vacant-office', [MailController::class, "notifyVacantPlantillaEmail"]);
Route::post('notify-next-rank', [MailController::class, "notifyNextRank"]);
Route::post('recruitment-common-email', [MailController::class, 'recruitmentEmail']);
//=======================================================================================
// VACANT POSITIONS CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('generate-vacant-memo-pdf/{id}', [TblplantillaItemsVacantPositionController::class, 'generateVacantMemoPdf']);
Route::get('get-agency-employee/{agency}/{plantilla}', [TblplantillaItemsVacantPositionController::class, 'getAgencyEmployees']);
Route::get('get-next-rank-employees/{item}', [TblplantillaItemsVacantPositionController::class, 'getNextInRankEmployees']);
Route::post('add-to-next-rank', [TblplantillaItemsVacantPositionController::class, 'addToNextInRank']);
Route::post('remove-to-next-rank', [TblplantillaItemsVacantPositionController::class, 'deleteNextInRank']);

Route::get('getAllPositions', [TblplantillaItemsVacantPositionController::class, "getAllPositions"]);
Route::get('vacantpositions/{type}', [TblplantillaItemsVacantPositionController::class, "getVacantPositions"]);
Route::get('generate-VpReport', [TblplantillaItemsVacantPositionController::class, 'generateVpReport']);
Route::get('generate-NoticeVpReport', [TblplantillaItemsVacantPositionController::class, 'generateNoticeVpReport']);
Route::get('generate-MemoOnPostingVPForCsc', [TblplantillaItemsVacantPositionController::class, 'generateMemoOnPostingVPForCsc']);
Route::get('generate-MemoOnPostingVPForDost', [TblplantillaItemsVacantPositionController::class, 'generateMemoOnPostingVPForDostAgencies']);
Route::post('closeVacantPositions', [TblplantillaItemsVacantPositionController::class, 'closeSelectedVacantPositions']);
Route::get('getAllDostAgencies', [TblplantillaItemsVacantPositionController::class, 'getAllDostAgencies']);
Route::get('getAllAgencies', [TblplantillaItemsVacantPositionController::class, 'getAllAgencies']);

//=======================================================================================
// OFFICEC POSITION CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('office', [TblofficesController::class, "office"]);
Route::get('agency', [TblofficesController::class, "agency"]);

Route::get('plantilla-positions/{id}', [TblofficesController::class, "plantillaPositions"]);
Route::get('plantilla-positions', [TblofficesController::class, "plantillaPosition"]);
Route::get('getOffices', [TblofficesController::class, "getAllOffices"]);

//=======================================================================================
// NOTIFICATION CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('get-notification', [NotificationController::class, "getNotification"]);
Route::post('mark-read/{id}', [NotificationController::class, "markAsReadNotification"]);

/**
 * Documentary Requirement Endpoints
 */
Route::get('get-documentary-requirements/{grp_id}', [TblapplicantDocumentRequirements::class, "getRequirentsByGroup"]);
Route::get('get-uploaded-documents/{grp_id}/{app_id}', [TblapplicantDocumentRequirements::class, "getUploadedRequirementsbyApplicant"]);
Route::get('delete-uploaded-documents/{att_id}', [TblapplicantDocumentRequirements::class, "deleteApplicantDocument"]);
Route::post('add-applicant-document', [TblapplicantDocumentRequirements::class, "saveApplicantDocument"]);
/**
 * Transaction Stages Endpoints
 */
Route::get('get-transaction-stage-select/{cluster}', [TblTransactionStagesController::class, "getTransactionStage"]);

/**
 * Applicant Status Endpoints
 */
Route::post('add-applicant-status', [TblapplicantStatusController::class, 'saveStatus']);


//=======================================================================================
// EMPLOYEE CONTROLLER ENDPOINTS
//=======================================================================================

Route::get('get-all-employee', [EmployeeController::class, "getAllEmployee"]);
