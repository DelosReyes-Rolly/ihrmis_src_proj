<?php

namespace App\Services\PlantillaItems;

use App\Http\Resources\CommonResource;
use App\Http\Resources\Plantilla\GetPositionWithCscResource;
use App\Models\Applicants\Tblapplicants;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Tblagencies;
use App\Models\Employees\Tblemployees;
use App\Models\Employees\TblnextInRank;
use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mpdf\Mpdf as MPDF;
// use Meneses\LaravelMpdf\Facades\LaravelMpdf;
class PlantillaItemsService
{

	/**
	 * getAllPlantillaItems
	 * Todo get all plantilla positions
	 * return array 
	 */
	public function getAllPlantillaItems() {

		$item_query = TblplantillaItems::with('tbloffices', 'tblpositions','tblapplicants')->get();
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
		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}

		$new_data['vacantpositions'] = $data;

	    // return $new_data['vacantpositions'];

		$pdf = new MPDF();
		$date = date('m/d/Y');	
		$pdf->AddPage('L');
		$pdf->writeHTML(view('vacantPositionsPdf',$new_data,[], [
		'title'				=> 'Vacant Positions',
		'margin_left'     	=> 10,
		'margin_right'      => 10,
		'margin_top'        => 10,
		'margin_bottom'     => 10,
		'orientation'       => 'L',
		'format' 			=> 'A4'
		]));
		return $pdf->output('Vacant Positions_'.$date.'.pdf',"I");
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
		$data = $this->getVacantPositions(0);

		$new_data = [];

		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}
	
		$new_data['vacantpositions'] = $data;
		
		$pdf = new MPDF();
		$date = date('m/d/Y');
		
		$pdf->writeHTML(view('noticeOnVacantPosition',$new_data,[], [
		'title'				=> 	'Notice of Vacancy',
		'margin_left'     	=> 10,
		'margin_right'      => 10,
		'margin_top'        => 10,
		'margin_bottom'     => 10,
		'orientation'       => 'P',
		'format' => 'A4'
		]));

		return $pdf->output('Notice of Vacancy_'.$date.'.pdf',"I");
  	}

	/**
	 * generateMemoOnPostingVpReport
	 * Todo this function will generate Memo On Posting Vacant Position For CSC report in PDF form
	 * @return void
	 */
	public function generateMemoOnPostingVpReport()
	{
  
		date_default_timezone_set('Asia/Manila'); //define local time
		
		$data = $this->getVacantPositions(0);

		$new_data = [];

		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}
	
		$new_data['vacantpositions'] = $data;
		$date = date('m/d/Y');

		$pdf = new MPDF();
		
		$pdf->writeHTML(view('memoOnPostingVPForCsc',$new_data,[], [
		'title'				=> 	'Notice of Vacancy',
		'margin_left'     	=> 10,
		'margin_right'      => 10,
		'margin_top'        => 10,
		'margin_bottom'     => 10,
		'orientation'       => 'P',
		'format' => 'A4'
		]));

		return $pdf->output('Memo On Posting Vacant Position For CSC_'.$date.'.pdf',"I");
  	}
	  
	/**
	 * generateMemoOnPostingVpForDostReport
	 * Todo this function will generate Memo On Posting Vacant Position For DOST Agencies report in PDF form
	 * @return void
	 */
	public function generateMemoOnPostingVpForDostReport()
	{
  
		date_default_timezone_set('Asia/Manila'); //define local time
		
		//1 for vacant positions
		$data = $this->getVacantPositions(1);

		$new_data = [];

		foreach($data as $itm){
			$positionswithcscstandards = $this->getPositionWithCsc($itm->tblpositions->pos_id);
			$itm->positionswithcscstandards = $positionswithcscstandards;
		}
	
		$new_data['vacantpositions'] = $data;
		
		$date = date('m/d/Y');

		$pdf = new MPDF();
		$pdf->writeHTML(view('memoOnPostingVpForDostAgencies',$new_data,[], [
		'title'				=> 	'Notice of Vacancy',
		'margin_left'     	=> 10,
		'margin_right'      => 10,
		'margin_top'        => 10,
		'margin_bottom'     => 10,
		'orientation'       => 'P',
		'format' => 'A4'
		]));
		
		return $pdf->output('Memo On Posting Vacant Position For DOST Agencies_'.$date.'.pdf',"I");
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
							if(Tblemployees::where('emp_id', $tbl_applicant_query->app_emp_id)->exists()){
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
		$newemployee->save();
		return $newemployee;
	}

	private function updateEmployeeProfile($data,$plantilladata){
		$employee = Tblemployees::find($data->app_id);
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

	/**
	 * getVacantPositions
	 * Todo get vacant positions by
	 * @return array 
	 */
	public function getVacantPositions($type) {

		$item_query = TblplantillaItems::with('tbloffices', 'tblpositions','tblapplicant_profile')->where('itm_state', $type)->get();
		return $item_query;

	}

	/**
	 * getPositionWithCsc
	 * Todo get position with CSC Standards
	 * @return
	 */
	public function getPositionWithCsc( $id)
	{
		$getQry = Tblpositions::where("pos_id", $id)->with("tblpositionCscStandards")->first();
		return new GetPositionWithCscResource($getQry);
	}

	/**
	 * getAllDostAgencies
	 * Todo get all DOST Agencies
	 * @return array 
	 */
	public function getAllDostAgencies() {

		$item_query = Tblagencies::where('agn_sector', 'DCO')->orWhere('agn_sector', 'DRO')
		->orWhere('agn_sector', 'DAA')->get();
		return json_decode($item_query);
		
	}

	/**
	 * getAllDostAgencies
	 * Todo get all DOST Agencies
	 * @return array 
	 */
	public function getAllAgencies()
    {
        return CommonResource::collection(
            Tblagencies::get(),
        );
    }

	public function generateVacantMemoPdf($type){

		$query = TblnextInRank::where("nir_itm_id", $type)->get();
		$arrHolder = [];
		foreach ($query as $value) {
			array_push($arrHolder, "<strong>".$value["nir_name"]."</strong>".", ".$value["nir_pos_title"].", ".$value["nir_office"]);
		}
		
		$data = [
			"employee" => implode("<br>" ,$arrHolder)
		];
		$report = new MPDF();
		$report->writeHTML(view('reports/vacantMemoReportPdf', $data ));
		return $report->output();
	}

  	public function getAgencyEmployees($agency, $plantilla){
		$itemQry = Tbloffices::where('ofc_agn_id', $agency)->with('plantillaItems.employee', 'plantillaItems.tblpositions')->get();
		$nextRankQrt = TblnextInRank::where('nir_itm_id', $plantilla)->get();
		$arrEmpIdHolder =[];
		foreach($nextRankQrt as $value){
		array_push($arrEmpIdHolder, $value->nir_emp_id);
    }

    $arrHolder = [];
    foreach ($itemQry as $offices) {
      foreach($offices->plantillaItems as $items){
        if($items->employee != null){
          if(!in_array($items->employee->emp_id, $arrEmpIdHolder)){
            $name = $items->employee->emp_nm_last . ", " . $items->employee->emp_nm_last . " " .  $items->employee->emp_nm_mid . " " .  $items->employee->emp_nm_extn;
            array_push($arrHolder, [
            'nir_name' => $name,
            'nir_email' =>  $items->employee->emp_ofc_email,
            'nir_office' => $offices->ofc_acronym,
            'nir_pos_title' => $items->tblpositions->pos_title,
            'nir_emp_id' => $items->employee->emp_id,
            'nir_ofc_id' => $offices->ofc_id,
            'nir_agn_id' => (int)$agency,
            'nir_itm_id' => 1
            ]);
          }
        }
      }
    }

    return $arrHolder;

  }

	public function addToNextInRank($request){

		$listHolder = $request->emp_list;
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
		$addQry->save();
		}

		return response()->json([
		"message" => "Successfully Added",
		], 200);
	}


}
