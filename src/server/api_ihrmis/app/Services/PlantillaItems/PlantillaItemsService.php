<?php

namespace App\Services\PlantillaItems;

use App\Http\Resources\Applicant\ApplicantProfileResource;
use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Employees\TblEmployees;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use Mpdf\Mpdf as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlantillaItemsService {

	public function getPositionWithCsc( $id)
	{
		$getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
		return new GetPositionWithCscResource($getQry);
	}

	/**
	 * getVacantPositions
	 * Todo get vacant positions by
	 * return array 
	 */
	public function getAllPlantillaItems() {

		$item_query = TblplantillaItems::with('tbloffices', 'tblpositions','tblapplicants')->get();
		return $item_query;

	}

	/**
	 * getVacantPositions
	 * Todo get vacant positions by
	 * return array 
	 */
	public function getVacantPositions($type) {

		$item_query = TblplantillaItems::with('tbloffices', 'tblpositions','tblapplicant_profile')->where('itm_state', $type)->get();
		return $item_query;

	}
    
	/**
	 * generateVacantPositionsReport
	 * Todo this function will generate DOST Vacant Position report in PDF form
	 * return void
	 */
	public function generateVacantPositionsReport()
	{

		//$pdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4-L']);
  
		// date_default_timezone_set('Asia/Manila'); //define local time
		
		// $data = $this->getVacantPositions(1);

		// $new_data = [];

		// foreach($data as $itm){
		// 	$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
		// 	$itm->positionswithcscstandards = $positionswithcscstandards;
		// }
	
		// $new_data['vacantpositions'] = $data;
	
		// $date = date('m/d/Y');

		// // Setup a filename 
        // $documentFileName = "DOST-CO Vacant Position_".$date.".pdf";

		// $pdf = PDF::loadHTML('vacantPositionsPdf',$new_data,[], [
		// 'title'				=> 	'DOST-CO Vacant Position',
		// 'margin_left'     	=> 10,
		// 'margin_right'      => 10,
		// 'margin_top'        => 10,
		// 'margin_bottom'     => 10,
		// 'orientation'       => 'L',
		// 'format' => 'A4'
		// ]);
		
		// //Set some header informations for output
        // $header = [
        //     'Content-Type' => 'application/pdf',
        //     'Content-Disposition' => 'inline; filename="'.$documentFileName.'"'
        // ];


		$pdf = new \Mpdf\Mpdf(['format' => 'Legal']);

		$pdf->WriteHTML('Hello World');
  	}

	
	/**
	 * generateNoticeofVacancyReports
	 * Todo this function will generate Notice of Vacancy report in PDF form
	 * return void
	 */
	public function generateNoticeofVacancyReports()
	{
  
		date_default_timezone_set('Asia/Manila'); //define local time
		
		$data = $this->getVacantPositions(1);

		$new_data = [];

		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}
	
		$new_data['vacantpositions'] = $data;
		
		$date = date('m/d/Y');
		$pdf = PDF::loadView('noticeOnVacantPosition',$new_data);
		$pdf->setPaper('margin', '1')->setWarnings(false)
		->setPaper('a4', 'portrait')
		->setOptions(['dpi' => 600, 'defaultFont' => 'Arial']);
		return $pdf->stream('Notice of Vacancy_'.$date.'.pdf');
  	}

	/**
	 * generateMemoOnPostingVpReport
	 * Todo this function will generate Memo On Posting Vacant Position For CSC report in PDF form
	 * return void
	 */
	public function generateMemoOnPostingVpReport()
	{
  
		date_default_timezone_set('Asia/Manila'); //define local time
		
		$data = $this->getVacantPositions(1);

		$new_data = [];

		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}
	
		$new_data['vacantpositions'] = $data;
		
		$date = date('m/d/Y');
		$pdf = PDF::loadView('memoOnPostingVPForCsc',$new_data);
		$pdf->setPaper('a4', 'portrait')->setWarnings(false)
		->setOptions(['dpi' => 600, 'defaultFont' => 'Arial']);
		return $pdf->stream('Memo On Posting Vacant Position For CSC_'.$date.'.pdf');
  	}
	  
	/**
	 * generateMemoOnPostingVpForDostReport
	 * Todo this function will generate Memo On Posting Vacant Position For DOST Agencies report in PDF form
	 * return void
	 */
	public function generateMemoOnPostingVpForDostReport()
	{
  
		date_default_timezone_set('Asia/Manila'); //define local time
		
		$data = $this->getVacantPositions(1);

		$new_data = [];

		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}
	
		$new_data['vacantpositions'] = $data;
		
		$date = date('m/d/Y');
		$pdf = PDF::loadView('memoOnPostingVpForDostAgencies',$new_data);
		$pdf->setPaper('a4', 'portrait')->setWarnings(false)
		->setOptions(['dpi' => 600, 'defaultFont' => 'Arial']);
		return $pdf->stream('Memo On Posting Vacant Position For DOST Agencies_'.$date.'.pdf');
  	} 

	/**
	 * closeVacantPositions
	 * Todo Close selected vacant position/s
	 * @return object json response
	 */
	public function closeVacantPositions(Request $request){

		$is_save = null;

        foreach ($request->all()['positions'] as $value) {

            $vacantpos = TblplantillaItems::find($value['itm_id']);
			$vacant_state = $vacantpos->itm_state;
			$message = "Successfully closed the selected positions";
			if($vacantpos->itm_state == 0){
				DB::beginTransaction();
				
				
				if(Tblapplicants::where('app_itm_id', $value['itm_id'] )->exists()){
						
						//set to filled state
						$vacantpos->itm_state = 1;
						$vacantpos->save(); 

						$tbl_applicant_query =  Tblapplicants::where('app_itm_id', $value['itm_id'] )->first();
						//return $tbl_applicant_query;
						$applicantDataQry = TblapplicantsProfile::find($tbl_applicant_query->app_id);
						//return new ApplicantProfileResource($applicantDataQry);
						//return $applicantDataQry;
						if($applicantDataQry){
							if(TblEmployees::where('emp_id', $tbl_applicant_query->app_emp_id)->exists()){
								$is_save = $this->updateEmployeeProfile($tbl_applicant_query,$value);
								DB::commit();
							}else{
								$is_save = $this->insertEmployeeProfile($applicantDataQry,$value);
								DB::commit();
							}
						}else{
							$message = "No Applicant Profile yet.";
							DB::rollBack();
						}			
				}else{
					$message = "No applicant has applied yet to this Plantilla Item";
				}
			}else{
				$message = "Selected position is filled already";
			}
			
        }

		
		// return $is_save;
		// test if it returns the request data
		// return $request->all()['positions'];
		
		return response()->json([

			"code" => $is_save ? 200 : 500,
			"message" => $message,
			"applicant_profile" => ''//$applicant_query
		]);
	
	}

	private function insertEmployeeProfile($data,$plantilladata){
		$newemployee = new TblEmployees();
		$newemployee->emp_no = "";
		$newemployee->emp_nm_last = $data->app_nm_last;
		$newemployee->emp_nm_first = $data->app_nm_first;
		$newemployee->emp_nm_mid = $data->app_nm_mid;
		$newemployee->emp_nm_extn = $data->app_nm_extn;
		$newemployee->emp_title = $data->app_sex == 'M' ? 'Mr.' : ($data->app_civil_status == 'MR' ? 'Mrs.' : 'Ms.');
		$newemployee->emp_nm_extn = $data->app_nm_extn;
		$newemployee->emp_itm_id = $plantilladata['itm_id'];
		$newemployee->emp_ofc_email = "";
		$newemployee->save();
		return $newemployee;
	}

	private function updateEmployeeProfile($data,$plantilladata){
		$employee = TblEmployees::find($data->app_id);
		$employee->emp_itm_id = $plantilladata['itm_id'];
		
		return $employee->save();
	}

	private function generateEmpNo($plantillaitm_data){
		//get $item_source
		//get $last_emp_no
		//get $current_year
		//assign $separator = "_";
		//concatinate $last_emp_no + 1 . "_" . $item_source . "_" . $current_year	
	}

}