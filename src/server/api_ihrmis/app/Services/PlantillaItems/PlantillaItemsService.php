<?php

namespace App\Services\PlantillaItems;

use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Tblagencies;
use App\Models\Employees\Tblemployees;
use App\Models\Employees\TblnextInRank;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use App\Services\CommonHelpers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Mpdf\Mpdf as MPDF;
use Exception;
use Illuminate\Database\QueryException;

// use Meneses\LaravelMpdf\Facades\LaravelMpdf;
class PlantillaItemsService
{
	protected $cHelper;

	public function __construct()
	{
		$this->cHelper = new CommonHelpers();
	}

	/**
	 * closeVacantPositions
	 * Todo Close selected vacant position/s
	 * @return object json response
	 */
	public function closeVacantPositions(Request $request)
	{

		$is_save = [];
		$applicantDataQry = [];
		$result = [];
		$code = 200;
		$message = "Successful";
		$temp_issave = false;
		try {
			foreach ($request->all() as $value) {
				DB::beginTransaction();
				$vacantpos = TblplantillaItems::find($value['itm_id']);
				$vacant_state = $vacantpos->itm_state;
				$temp_result = [];
				$temp_result['itm_no'] = $vacantpos->itm_no;
				if ($vacant_state == 1) {
					if (Tblapplicants::where('app_itm_id', $value['itm_id'])->exists()) {

						$tbl_applicant_query =  Tblapplicants::where('app_itm_id', $value['itm_id'])->first();

						$temp_result['applicant_profile'] = TblapplicantsProfile::find($tbl_applicant_query->app_id);

						if ($applicantDataQry) {
							if (Tblemployees::where('emp_id', $tbl_applicant_query->app_emp_id)->exists()) {
								$temp_issave = $this->updateEmployeeProfile($tbl_applicant_query, $value);
								DB::commit();
							} else {
								$temp_issave = $this->insertEmployeeProfile($applicantDataQry, $value);
								DB::commit();
							}
							//set to filled state
							$vacantpos->itm_state = 0;
							$vacantpos->save();

							$temp_result['message'] = $temp_issave ? "Successfully closed the selected positions" : "Error upon query execution";
							$temp_result['code'] = $temp_issave ? 200 : 500;
						} else {

							$temp_result['message'] = "No Applicant Profile yet.";
							$temp_result['code'] = 500;
							DB::rollBack();
						}
					} else {
						$temp_result['message'] = "No applicant has applied yet to this Plantilla Item";
						$temp_result['code'] = 500;
					}
				} else {
					$temp_result['message'] = "Selected position is filled already";
					$temp_result['code'] = $temp_issave;
				}
				array_push($result, $temp_result);
			}
		} catch (Exception $e) {
			$code = 500;
			$message = "Error: " . $e->getMessage();
		} catch (QueryException $e) {
			$code = 500;
			$message =  "Query Error: " . $e->getMessage();
		}

		return response()->json([

			"code" => $code,
			"message" => $message,
			"result" => $result,
		]);
	}

	/**
	 * addToNextInRank
	 * Todo add to next rank employee
	 * @return array 
	 */
	public function addToNextInRank($request)
	{

		$listHolder = $request->emp_list;
		//$result = false;
		// return $listHolder;
		foreach ($listHolder as $value) {
			$addQry = new TblnextInRank();
			$addQry->nir_name = $value['nir_name'];
			$addQry->nir_email =  $value['nir_email'];
			$addQry->nir_office = $value['nir_office'];
			$addQry->nir_pos_title = $value['nir_pos_title'];
			$addQry->nir_emp_id = $value['nir_emp_id'];
			$addQry->nir_ofc_id = $value['nir_ofc_id'];
			$addQry->nir_agn_id = $value['nir_agn_id'];
			$addQry->nir_itm_id = $value['nir_itm_id'];
			$result = $addQry->save();
		}

		$status = 200;
		$message = "Successfully Added";

		$this->cHelper->response($result, $status, $message);
	}

	/**
	 * insertEmployeeProfile
	 * Todo insert employee profile
	 * @return object
	 */
	private function insertEmployeeProfile($data, $plantilladata)
	{

		$newemployee = new Tblemployees();
		$newemployee->emp_no = "";
		$newemployee->emp_nm_last = $data->app_nm_last;
		$newemployee->emp_nm_first = $data->app_nm_first;
		$newemployee->emp_nm_mid = $data->app_nm_mid;
		$newemployee->emp_nm_extn = $data->app_nm_extn;
		$newemployee->emp_title = $data->app_sex == 'M' ? 'Mr.' : ($data->app_civil_status == 'MR' ? 'Mrs.' : 'Ms.');
		$newemployee->emp_nm_extn = $data->app_nm_extn;
		$newemployee->emp_itm_id = $plantilladata['itm_id'];
		$newemployee->emp_ofc_email = "";
		$result = $newemployee->save();

		return $newemployee;
	}

	/**
	 * updateEmployeeProfile
	 * Todo update employee profile
	 * @return void
	 */
	private function updateEmployeeProfile($data, $plantilladata)
	{

		$employee = Tblemployees::find($data->app_id);
		$employee->emp_itm_id = $plantilladata['itm_id'];

		return $employee->save();
	}

	########################################## GET METHODS #######################################################

	/**
	 * getAllPlantillaItems
	 * Todo get all plantilla positions
	 * return array 
	 */
	public function getAllPlantillaItems()
	{

		$item_query = TblplantillaItems::with('tbloffices', 'tbloffices.officeAgency', 'tblpositions', 'tblapplicants')->get();

		return $item_query;
	}

	/**
	 * getPlantillaItemById
	 * Todo get all plantilla positions
	 * return array 
	 */
	public function getPlantillaItemById($id)
	{

		$item_query = TblplantillaItems::with(
			'tbloffices',
			'tbloffices.officeAgency',
			'tblpositions',
		)
			->where("itm_id", (int) $id)
			->first();

		return $item_query;
	}

	/**
	 * generateVacantPositionsReport
	 * Todo this function will generate DOST Vacant Position report in PDF form
	 * @return void
	 */
	public function generateVacantPositionsReport()
	{

		date_default_timezone_set('Asia/Manila'); //define local time

		//get vacant positions
		$data = $this->getVacantPositions(0);
		//sreturn $data;

		$new_data = [];
		foreach ($data as $itm) {
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}

		$new_data['vacantpositions'] = $data;

		// return $new_data['vacantpositions'];

		$pdf = new MPDF();
		$date = date('m/d/Y');
		$pdf->AddPage('L');
		$pdf->writeHTML(view('vacantPositionsPdf', $new_data, [], [
			'title'				=> 'Vacant Positions',
			'margin_left'     	=> 10,
			'margin_right'      => 10,
			'margin_top'        => 10,
			'margin_bottom'     => 10,
			'orientation'       => 'L',
			'format' 			=> 'A4'
		]));
		return $pdf->output('Vacant Positions_' . $date . '.pdf', "I");
	}

	/**
	 * generateMemoOnPostingVpReport
	 * Todo this function will generate Memo On Posting Vacant Position For CSC report in PDF form
	 * @return void
	 */
	public function generateMemoOnPostingVpForCscReport($selected_agency)
	{
		$this->generateMemoOnPostingFor($selected_agency, 'CSC');
	}

	/**
	 * generateMemoOnPostingVpForDostReport
	 * Todo this function will generate Memo On Posting Vacant Position For DOST Agencies report in PDF form
	 * @return void
	 */
	public function generateMemoOnPostingVpForDostReport($selected_agency)
	{
		$this->generateMemoOnPostingFor($selected_agency, 'DOST');
	}

	/**
	 * getVacantPositions
	 * Todo get vacant positions by
	 * @return array 
	 */
	public function getVacantPositions($item_state)
	{

		$item_query = TblplantillaItems::with(
			'tbloffices',
			'tbloffices.officeAgency',
			'tblpositions',
			'tblapplicants'
		)->where('itm_state', $item_state)->get();
		return $item_query;
	}

	/**
	 * getPlantillaItemDetails
	 */
	public function getPlantillaItemDetails($item_state = 1)
	{
		$item_query = TblplantillaItems::with(
			'tbloffices',
			'tbloffices.officeAgency',
			'tblpositions',
			'tblapplicants',
			'tblpositions.tblpositionCscStandards',
			'tbldtyresponsibility'
		)->where('itm_state', $item_state)->get();

		date_default_timezone_set('Asia/Manila');
		$now = date('d/m/Y');

		foreach ($item_query as $value) {
			$csc_standard = $this->cHelper->cscStandardFormatter($value->tblpositions->tblpositionCscStandards);
			$value->education = $csc_standard["ed"] ?? "";
			$value->experience = $csc_standard["ex"] ?? "";
			$value->training = $csc_standard["tr"]  ?? "";
			$value->eligibility = $csc_standard["cs"] ?? "";
			unset($value->tblpositions->tblpositionCscStandards);
			$date = date_create($value->deadline);
			$value->deadline_formatted = date_format($date, "d F Y");
			$value->letter_head = Config::get('memorandum.letter_head');
			$value->memo_from_name = Config::get('memorandum.memo_from_info');
			$value->date_submitted = $now;
			$value->formatted_date_submitted = Carbon::now()->format('d F Y');
		}

		return $item_query;
	}

	/**
	 * getPositionWithCsc
	 * Todo get position with CSC Standards
	 * @return array
	 */
	public function getPositionWithCsc($id)
	{
		$getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
		return new GetPositionWithCscResource($getQry);
	}

	/**
	 * getAllDostAgencies
	 * Todo get all DOST Agencies
	 * @return object 
	 */
	public function getAllDostAgencies()
	{

		$item_query = Tblagencies::where('agn_sector', 'DCO')->orWhere('agn_sector', 'DRO')
			->orWhere('agn_sector', 'DAA')->get();
		return json_decode($item_query);
	}

	/**
	 * getAllDostAgencies
	 * Todo get all Agencies
	 * @return object 
	 */
	public function getAllAgencies()
	{
		$item_query = Tblagencies::get();
		return json_decode($item_query);
	}

	/**
	 * getAgency
	 * Todo get Agency
	 * @return array 
	 */
	public function getAgency($id)
	{
		$item_query = Tblagencies::where("agn_id", $id)->first();
		$item_query->office = $this->getOffice($item_query->agn_id);
		return $item_query;
	}

	/**
	 * getAgency
	 * Todo get Office
	 * @return array 
	 */
	public function getOffice($id)
	{
		$item_query = Tbloffices::where("ofc_agn_id", $id)->first();
		return $item_query;
	}

	/**
	 * generateVacantMemoPdf
	 * Todo generate vacnt memo pdf
	 * @return array 
	 */
	public function generateVacantMemoPdf($type)
	{

		$idAndNextInRank = json_decode($type);
		$query = TblnextInRank::where("nir_itm_id", $idAndNextInRank->id)->get();
		$plantilla = TblplantillaItems::where("itm_id", $idAndNextInRank->id)->with("tblpositions")->first();
		$queryHolder = [];
		foreach ($query as $value) {
			foreach ($idAndNextInRank->next_rank as $addValue) {
				if ($addValue == $value->nir_emp_id) {
					array_push($queryHolder, $value);
				}
			}
		}

		$arrHolder = [];
		foreach ($queryHolder as $value) {
			array_push($arrHolder, "<strong>" . $value["nir_name"] . "</strong>" . ", " . $value["nir_pos_title"] . ", " . $value["nir_office"]);
		}

		$data = [
			"employee" => implode("<br>", $arrHolder),
			"date_now" => Carbon::now()->format('d F Y'),
			"title" => "Filling up one (1) " . $plantilla->tblpositions->pos_title,
			"grade" => $plantilla->tblpositions->pos_salary_grade,
			"item" => $plantilla->itm_no
		];
		$report = new MPDF();
		$report->writeHTML(view('reports/vacantMemoReportPdf', $data));
		return $report->output();
	}

	/**
	 * getAgencyEmployees
	 * Todo get agency employees
	 * @return array 
	 */
	public function getAgencyEmployees($agency, $itm_id)
	{
		$itemQry = Tbloffices::where('ofc_agn_id', $agency)->with('plantillaItems.employee', 'plantillaItems.tblpositions')->get();
		$nextRankQrt = TblnextInRank::where('nir_itm_id', $itm_id)->get();
		$arrEmpIdHolder = [];
		foreach ($nextRankQrt as $value) {
			array_push($arrEmpIdHolder, $value->nir_emp_id);
		}

		$arrHolder = [];
		foreach ($itemQry as $offices) {
			foreach ($offices->plantillaItems as $items) {
				if ($items->employee != null) {
					if (!in_array($items->employee->emp_id, $arrEmpIdHolder)) {
						$name = $items->employee->emp_nm_last . ", " . $items->employee->emp_nm_last . " " .  $items->employee->emp_nm_mid . " " .  $items->employee->emp_nm_extn;
						array_push($arrHolder, [
							'nir_name' => $name,
							'nir_email' =>  $items->employee->emp_ofc_email,
							'nir_office' => $offices->ofc_acronym,
							'nir_pos_title' => $items->tblpositions->pos_title,
							'nir_emp_id' => $items->employee->emp_id,
							'nir_ofc_id' => $offices->ofc_id,
							'nir_agn_id' => (int)$agency,
							'nir_itm_id' => $itm_id
						]);
					}
				}
			}
		}

		return $arrHolder;
	}

	/**
	 * generateMemoOnPostingFor
	 * Todo generate memo on posting
	 * @return void
	 */
	private function generateMemoOnPostingFor($selected_agency, $memo)
	{

		date_default_timezone_set('Asia/Manila'); //define local time


		$data = $this->getVacantPositions(1);

		$new_data = [];

		foreach ($data as $itm) {

			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}

		$decoded_selected_agency = json_decode($selected_agency, true);

		$new_selected_agency_data = [];
		foreach ($decoded_selected_agency as $itm) {

			array_push($new_selected_agency_data, $this->getAgency($itm['agn_id']));
		}

		// $date = date('m/d/Y');
		$date = date("j F Y");

		$new_data['vacantpositions'] = $data;
		$new_data['selected_agencies'] = $new_selected_agency_data;
		$new_data['date_memo'] = $date;
		$new_data['memo'] = $memo;
		$new_data['memo_from_name'] = Config::get('memorandum.memo_from_info');

		// return $new_data;

		$pdf = new MPDF();
		$pdf->writeHTML(view('memoonpostingofvacancydostcsc', $new_data, [], [
			'title'				=> 	'MEMORANDUM',
			'margin_left'     	=> 10,
			'margin_right'      => 10,
			'margin_top'        => 10,
			'margin_bottom'     => 10,
			'orientation'       => 'P',
			'format' => 'A4'
		]));

		return $pdf->output('Memo On Posting Vacant Position For '
			. ($memo == 'DOST' ? 'DOST Agencies_' : 'CSC_') . $date . '.pdf', "I");
	}

	/**
	 * generateNoticeofVacancyReports
	 * Todo this function will generate Notice of Vacancy report in PDF form
	 * @return void
	 */
	public function generateNoticeofVacancyReports()
	{
		date_default_timezone_set('Asia/Manila'); //define local time
		//get vacant position

		$new_data = [];
		$new_data['vacantpositions'] = $this->getPlantillaItemDetails();
		$new_data['letter_head'] = Config::get('memorandum.letter_head');
		$new_data['memo_from_name'] = Config::get('memorandum.memo_from_info');
		$date = date('m/d/Y');

		$pdf = new MPDF();
		$pdf->writeHTML(view('noticeOfVacancy', $new_data, [], [
			'title'				=> 	'Notice of Vacancy',
			'margin_left'     	=> 10,
			'margin_right'      => 10,
			'margin_top'        => 10,
			'margin_bottom'     => 10,
			'orientation'       => 'P',
			'format' => 'A4'
		]));

		return $pdf->output('Notice of Vacancy_' . $date . '.pdf', "I");
	}
}
