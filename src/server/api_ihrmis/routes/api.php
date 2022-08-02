<?php

use App\Http\Controllers\AccountRequestResource as AccResource;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Applicant\TblapplicantChildrenController;
use App\Http\Controllers\Applicant\TblapplicantCseligibilitiesController;
use App\Http\Controllers\Applicant\TblapplicantDeclarationController;
use App\Http\Controllers\Applicant\TblapplicantDocumentRequirements;
use App\Http\Controllers\Applicant\TblapplicantEducationsController;
use App\Http\Controllers\Applicant\TblapplicantExperiencesController;
use App\Http\Controllers\Applicant\TblapplicantOtherInfoController;
use App\Http\Controllers\Applicant\TblapplicantProfileController;
use App\Http\Controllers\Applicant\TblApplicantReferenceCheck;
use App\Http\Controllers\Applicant\TblapplicantReferencesController;
use App\Http\Controllers\Applicant\TblapplicantRequirementsController;
use App\Http\Controllers\Applicant\TblapplicantsController;
use App\Http\Controllers\Applicant\TblapplicantStatusController;
use App\Http\Controllers\Applicant\TblapplicantTrainingsController;
use App\Http\Controllers\Applicant\TblapplicantVoluntaryController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\Jvs\TbljvsController;
use App\Http\Controllers\Library\EvaluationBattery;
use App\Http\Controllers\MailController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\Recruitment\RecruitmentController;
use App\Http\Controllers\TblCalendarController;
use App\Http\Controllers\TblofficesController;
use App\Http\Controllers\TblplantillaDtyAndRspnsbltyController;
use App\Http\Controllers\TblplantillaItemsController;
use App\Http\Controllers\TblplantillaItemsVacantPositionController;
use App\Http\Controllers\TblpositionsController;
use App\Http\Controllers\TblTransactionStagesController;
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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', [AuthController::class, "logout"]);
});
Route::get('getOffices', [TblofficesController::class, "getAllOffices"]);
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//=======================================================================================
// APPLICANT ENDPOINTS
//=======================================================================================
Route::post('new-applicant/{position?}', [TblapplicantProfileController::class, "createApplicant"]);
Route::post('modify-applicant/{id?}', [TblapplicantProfileController::class, "modifyApplicant"]);
Route::post('new-afc/{id}', [TblapplicantProfileController::class, "createFamilyChildren"]);
Route::get('verify-email', [TblapplicantProfileController::class, "verifyEmail"]);
Route::get('get-new-applicant/{id?}', [TblapplicantProfileController::class, "getApplicant"]);
Route::get('get-new-family/{id}', [TblapplicantProfileController::class, "getFamilyChildren"]);

//crud-child
Route::get('new-children/{id}', [TblapplicantChildrenController::class, "getChildrenRecord"]);
Route::post('new-children/{id}', [TblapplicantChildrenController::class, "addChildrenRecord"]);
Route::delete('new-children/{id}', [TblapplicantChildrenController::class, "removeChildrenRecord"]);
//crud-educ
Route::post('new-education/{id?}', [TblapplicantEducationsController::class, "addEducationRecord"]);
Route::get('new-education/{id}', [TblapplicantEducationsController::class, "getEducationRecord"]);
Route::delete('new-education/{id}', [TblapplicantEducationsController::class, "removeEducationRecord"]);
//crud-csc
Route::get('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "getCseligibilityRecord"]);
Route::post('new-csc-eleigibility/{id?}', [TblapplicantCseligibilitiesController::class, "addCseligibilityRecord"]);
Route::delete('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "removeCseligibilityRecord"]);
//crud-exp
Route::get('new-work-experience/{id}', [TblapplicantExperiencesController::class, "getExperienceRecord"]);
Route::post('new-work-experience/{id?}', [TblapplicantExperiencesController::class, "addExperienceRecord"]);
Route::delete('new-work-experience/{id}', [TblapplicantExperiencesController::class, "removeExperienceRecord"]);
//crud-vol
Route::get('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "getVoluntaryRecord"]);
Route::post('new-voluntary-work/{id?}', [TblapplicantVoluntaryController::class, "addVoluntaryRecord"]);
Route::delete('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "removeVoluntaryRecord"]);
//crud-trn
Route::get('new-training/{id}', [TblapplicantTrainingsController::class, "getTrainingRecord"]);
Route::post('new-training/{id?}', [TblapplicantTrainingsController::class, "addTrainingRecord"]);
Route::delete('new-training/{id}', [TblapplicantTrainingsController::class, "removeTrainingRecord"]);
//crud-otr
Route::get('new-other-info/{id}', [TblapplicantOtherInfoController::class, "getOtherInfoRecord"]);
Route::post('new-other-info/{id?}', [TblapplicantOtherInfoController::class, "addOtherInfoRecord"]);
Route::delete('new-other-info/{id}', [TblapplicantOtherInfoController::class, "removeOtherInfoRecord"]);
//crud-ref
Route::get('new-reference/{id}', [TblapplicantReferencesController::class, "getReferenceRecord"]);
Route::post('new-reference/{id?}', [TblapplicantReferencesController::class, "addReferenceRecord"]);
Route::delete('new-reference/{id}', [TblapplicantReferencesController::class, "removeReferenceRecord"]);

//crud-ref-check
Route::get('get-reference-check/{reference}', [TblApplicantReferenceCheck::class, "getReferenceCheck"]);
Route::post('new-reference-check', [TblApplicantReferenceCheck::class, "addReferenceCheckAnswer"]);

//Info
Route::get('new-get-delcaration/{id}', [TblapplicantDeclarationController::class, "getDataDeclaration"]);
Route::post('new-declaration/{id}', [TblapplicantDeclarationController::class, "onSubmitDecleration"]);

//GOVERNMENT ID
Route::post('new-profile/{id}', [TblapplicantProfileController::class, "addGovernmentId"]);
Route::post('new-profile-image/{id}', [TblapplicantProfileController::class, "addimage"]);
//REQUIREMENTS
Route::post('new-requirement/{id}', [TblapplicantRequirementsController::class, "addDocuments"]);
Route::get('get-document-requirements/{app_id}', [TblapplicantRequirementsController::class, "getDocuments"]);
Route::delete('documentary-applicant-requirement/{type_id}', [TblapplicantRequirementsController::class, "deleteDocuments"]);


//=======================================================================================
// JVSCRW END POINTS
//=======================================================================================
Route::get('pos-csc-plantilla/{id}', [TbljvsController::class, "getPositionCscQualifation"]);
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

//=======================================================================================
// POSITION AND OFFICE END POINTS
//=======================================================================================

Route::post('create-position', [TblpositionsController::class, "addPosition"]);
Route::get('get-position/{id}', [TblpositionsController::class, "getPosition"]);


Route::get('get-info-position/{id?}', [TblpositionsController::class, "getPositionWithCsc"]);

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
Route::post("update-evaluation", [TblplantillaItemsController::class, "updateEvaluationState"]);

//=======================================================================================
// PLANTILLA DTY RESPONSIBILITY
//=======================================================================================
Route::get('get-dty-items/{id}', [TblplantillaDtyAndRspnsbltyController::class, "getDtyRspnsblty"]);
Route::post('add-dty-items/{id}', [TblplantillaDtyAndRspnsbltyController::class, "addDutiesAndResponsibilities"]);

//=======================================================================================
// OTHER RESOURCES
//=======================================================================================
Route::resource('plantilla-items', TblplantillaItemsController::class);
Route::resource('offices', \TblofficesController::class);
Route::post('save-agency', [TblofficesController::class, "saveAgency"]);
Route::resource('positions', TblpositionsController::class);
Route::resource('positions-csc-std', TblpositionsController::class);

//=======================================================================================
//  Library Resources
//=======================================================================================
Route::resource('category-groups', Library\CategoryGroup::class);
Route::resource('documentary-requirements', Library\DocumentRequirements::class);
Route::resource('evaluation-battery', Library\EvaluationBattery::class);
Route::delete('delete-evaluation-battery/{itm_id}', [EvaluationBattery::class, 'deleteSpecific']);
Route::get('evaluation-battery/{grpID}/{sg}', [EvaluationBattery::class, "show"]);
Route::get('documentary-requirements/{grpID}', [Library\DocumentRequirements::class, "show"]);
//=======================================================================================
// AUTH END POINTS
//=======================================================================================
Route::post('login', [AuthController::class, "login"]);
Route::post('register', [AuthController::class, "register"]);
Route::get('user-accounts', [AuthController::class, "getUsers"]);
Route::post('update-user', [AuthController::class, "updateUser"]);

Route::resource('account-request', AccountRequestResource::class);
Route::post('account-check-code/{id}', [AccResource::class, 'checkCode']);
Route::get('account-confirmed/{id}', [AccResource::class, 'getConfirmed']);

Route::post('assessment-score', [RecruitmentController::class, 'saveAssessment']);
Route::post('competency-assessment-score', [RecruitmentController::class, 'saveCompetencyAssessment']);
Route::post('save-hrmpsb-remarks', [RecruitmentController::class, 'saveHRMPSBRemarks']);
Route::post('employement-exam', [RecruitmentController::class, 'saveEmploymentExam']);
Route::get('get-cm-detail/{plantilla_id}', [RecruitmentController::class, "getPositionCM"]);
Route::get('get-cm-data/{plantilla_id}', [RecruitmentController::class, "getCMData"]);
Route::get('get-ra-data/{plantilla_id}/{applicant_id}', [RecruitmentController::class, "getRAData"]);
Route::get('get-battery-exam/{level}/{sg}/{appID}', [RecruitmentController::class, "getBattery"]);
Route::get('get-complete-applicant/{id}', [RecruitmentController::class, "getCompleteApplicantsProfile"]);
Route::get('get-assessment/{appID}', [RecruitmentController::class, "getAssessment"]);
Route::post('save-appointment', [RecruitmentController::class, "saveAppointment"]);
Route::get('get-hrmpsb-evaluation/{appID}/{type}', [RecruitmentController::class, "getHRMPSB"]);
Route::post('save-hrmpsb-evaluation', [RecruitmentController::class, "saveHRMPSB"]);
Route::get('getRAIDATA/{month}/{year}', [RecruitmentController::class, "getRAIDATA"]);

//Reports
Route::get('generate-POA/{plantillaId}', [RecruitmentController::class, "generatePOAReport"]);
Route::get('generate-RAI/{month}/{year}', [RecruitmentController::class, "generateRAIReport"]);
Route::get('generate-CM/{plantillaId}', [RecruitmentController::class, "generateCMReport"]);
Route::get('generate-OOO/{applicant}', [RecruitmentController::class, "generateOOOReport"]);
Route::get('generate-CAD/{applicant}', [RecruitmentController::class, "generateCADReport"]);
Route::get('generate-AFA/{applicant}', [RecruitmentController::class, "generateAFAReport"]);
Route::get('getApplicantAgency/{offceId}', [RecruitmentController::class, "getApplicantAgency"]);

//=======================================================================================
// MAIL CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('mail-template/{type?}', [MailController::class, "getEmailTemplate"]);
Route::post('add_mail-template', [MailController::class, "addEmail"]);
Route::delete('delete-mail-template/{template_id}', [MailController::class, "deleteEmailTemplate"]);
Route::post('notify-vacant-office', [MailController::class, "notifyVacantPlantillaEmail"]);
Route::post('notify-next-rank', [MailController::class, "notifyNextRank"]);
Route::post('recruitment-common-email', [MailController::class, 'recruitmentEmail']);
Route::get('verify-account/{id}', [MailController::class, "verifyAccount"]);
Route::get('verified-account/{id}', [MailController::class, "verifiedAccount"]);


//=======================================================================================
// VACANT POSITIONS CONTROLLER ENDPOINTS
//=======================================================================================

Route::post('add-to-next-rank', [TblplantillaItemsVacantPositionController::class, 'addToNextInRank']);
Route::post('remove-to-next-rank', [TblplantillaItemsVacantPositionController::class, 'deleteNextInRank']);
Route::post('closeVacantPositions', [TblplantillaItemsVacantPositionController::class, 'closeSelectedVacantPositions']);
Route::get('generate-vacant-memo-pdf/{id}', [TblplantillaItemsVacantPositionController::class, 'generateVacantMemoPdf']);
Route::get('get-agency-employee/{agency}/{plantilla}', [TblplantillaItemsVacantPositionController::class, 'getAgencyEmployees']);
Route::get('get-next-rank-employees/{item}', [TblplantillaItemsVacantPositionController::class, 'getNextInRankEmployees']);
Route::get('getAllPositions', [TblplantillaItemsVacantPositionController::class, "getAllPlantillaItems"]);
Route::get('getPlantillaVpById/{id}', [TblplantillaItemsVacantPositionController::class, "getPlantillaItemById"]);
Route::get('getVcEmailTemplateData/{id}', [TblplantillaItemsVacantPositionController::class, "getEmailTemplateData"]);
Route::get('vacantpositions/{type}', [TblplantillaItemsVacantPositionController::class, "getVacantPositions"]);
Route::get('generate-VpReport', [TblplantillaItemsVacantPositionController::class, 'generateVpReport']);
Route::get('generate-NoticeVpReport/{plantilla?}', [TblplantillaItemsVacantPositionController::class, 'generateNoticeVpReport']);
Route::get('generateMemoOnPVPForCsc', [TblplantillaItemsVacantPositionController::class, 'generateMemoOnPostingVPForCsc']);
Route::get('generateMemoOnPVPForDost/{data}', [TblplantillaItemsVacantPositionController::class, 'generateMemoOnPostingVPForDostAgencies']);
Route::get('getAllDostAgencies', [TblplantillaItemsVacantPositionController::class, 'getAllDostAgencies']);
Route::get('getAllAgencies', [TblplantillaItemsVacantPositionController::class, 'getAllAgencies']);
Route::get('getAgency/{id}', [TblplantillaItemsVacantPositionController::class, 'getAgency']);
Route::get('getPlantillaItemDetails/{item_state?}', [TblplantillaItemsVacantPositionController::class, 'getPlantillaItemDetails']);
Route::get('getPlantillaItemDetails/{item_id?}', [TblplantillaItemsVacantPositionController::class, 'getPlantillaItemDetails']);
Route::get('getPiPositionWithCsc/{id}', [TblplantillaItemsVacantPositionController::class, 'getPlantillaItemPositionWithCsc']);

//=======================================================================================
// OFFICEC POSITION CONTROLLER ENDPOINTS <-------------------------------------
//=======================================================================================
Route::get('office', [TblofficesController::class, "office"]);
Route::get('agency', [TblofficesController::class, "agency"]);

Route::get('plantilla-positions/{id}', [TblofficesController::class, "plantillaPositions"]);
Route::get('plantilla-positions', [TblofficesController::class, "plantillaPosition"]);


//=======================================================================================
// NOTIFICATION CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('get-notification', [NotificationController::class, "getNotification"]);
Route::post('mark-read/{id}', [NotificationController::class, "markAsReadNotification"]);

/**
 * Documentary Requirement Endpoints
 */

Route::get('get-documentary-requirements/{grp_id}/{grpLevel}', [TblapplicantDocumentRequirements::class, "getRequirentsByGroup"]);
Route::get('get-uploaded-documents/{grpLevel}/{grpCluster}/{app_id}', [TblapplicantDocumentRequirements::class, "getUploadedRequirementsbyApplicant"]);
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
Route::post('add-applicant-statuses', [TblapplicantStatusController::class, 'saveStatuses']);


//=======================================================================================
// EMPLOYEE CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('get-all-employee', [EmployeeController::class, "getAllEmployee"]);
Route::get('get-single-employee/{id}', [EmployeeController::class, "getSingleEmployee"]);

Route::post('add-update-emp_ref/{ref_id?}', [EmployeeController::class, "addUpdateReference"]);
Route::get('get-emp_ref/{emp_id}', [EmployeeController::class, "getEmployeeReference"]);
Route::delete('remove-emp_ref/{ref_id}', [EmployeeController::class, "removeEmployeeReference"]);

Route::post('add-update-emp_trn/{trn_id?}', [EmployeeController::class, "addUpdateTraining"]);
Route::get('get-emp_trn/{emp_id}', [EmployeeController::class, "getEmployeeTraining"]);
Route::delete('remove-emp_trn/{trn_id}', [EmployeeController::class, "removeEmployeeTraining"]);

Route::post('add-update-emp_vol/{vol_id?}', [EmployeeController::class, "addUpdateVoluntary"]);
Route::get('get-emp_vol/{emp_id}', [EmployeeController::class, "getEmployeeVoluntary"]);
Route::delete('remove-emp_vol/{vol_id}', [EmployeeController::class, "removeEmployeeVoluntary"]);

Route::post('add-update-emp_exp/{exp_id?}', [EmployeeController::class, "addUpdateExperience"]);
Route::get('get-emp_exp/{emp_id}', [EmployeeController::class, "getEmployeeExperience"]);
Route::delete('remove-emp_exp/{exp_id}', [EmployeeController::class, "removeEmployeeExperience"]);

Route::post('add-update-emp_cse/{cse_id?}', [EmployeeController::class, "addUpdateEligibility"]);
Route::get('get-emp_cse/{emp_id}', [EmployeeController::class, "getEmployeeEligibility"]);
Route::delete('remove-emp_cse/{cse_id}', [EmployeeController::class, "removeEmployeeEligibility"]);

Route::post('add-update-emp_edu/{edu_id?}', [EmployeeController::class, "addUpdateEducation"]);
Route::get('get-emp_edu/{emp_id}', [EmployeeController::class, "getEmployeeEducation"]);
Route::delete('remove-emp_edu/{edu_id}', [EmployeeController::class, "removeEmployeeEducation"]);

//=======================================================================================
// LIBRARY CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('get-history-service/{id?}', [EmployeeController::class, "getEmployeeHistoryService"]);

//=======================================================================================
// CALENDAR CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('getCalendarEventTypes', [TblCalendarController::class, "getCalendarEventTypes"]);

//=======================================================================================
// ONBOARDING CONTROLLER ENDPOINTS
//=======================================================================================
Route::get('get-all-onboarding-section', [OnboardingController::class, "getOnboardingSections"]);
Route::post('add-onboarding-section', [OnboardingController::class, "addOnboardingSections"]);
Route::post('modify-onboarding-section', [OnboardingController::class, "updateOnboardingSections"]);
Route::delete('delete-onboarding-section/{secId}', [OnboardingController::class, "removeOnboardingSections"]);
Route::get('get-section-item-by-id/{secId}', [OnboardingController::class, "getSectionItemBySectionId"]);
Route::post('add-onboarding-section-item', [OnboardingController::class, "addSectionItemBySectionId"]);
Route::post('modify-onboarding-section-item', [OnboardingController::class, "updateOnboardingSectionsItemOrder"]);
Route::post('new-onboarding-schedule', [OnboardingController::class, "createScheduleForOnboarding"]);
Route::get('onboarding-schedule', [OnboardingController::class, "getAllScheduleForOnboarding"]);
Route::post('selected-appointees', [OnboardingController::class, "getSelectedAppointees"]);
Route::get('selected-schedules/{id}', [OnboardingController::class, "getSingleOnboardingSchedule"]);


Route::get('get-onboarding-lists', [OnboardingController::class, "getOnboardingSectionsAndSectionItem"]);

Route::get('all-new-appointed', [TblapplicantsController::class, "getAppointedApplicantsWithEmpId"]);



// Route::post('')
