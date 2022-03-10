<?php
namespace App\Services\Jvscrw;

use App\Models\Tbljvs;
use App\Models\TbljvsCompetencies;
use App\Models\TbljvsCompetencyRatings;
use App\Models\TbljvsDutiesRspnsblts;
use Carbon\Carbon;

class JvscrwService {
 
  /// CALLED IN THE JVS CONTROLLER
  public function updateOrCreateCmpntncyRtng($request, $type){

    if($type == "save"){
      foreach ($request->competencies as $value) {
        if(!empty($value)){
          $this->addCompetencies($value);
        }
      }
      $this->dutiesResponsibilities($request);
      $this->onSubmitSign($request, $request->jvs_id);
    }
  }
  public function deleteRating($id, $order, $type){
    TbljvsCompetencyRatings::where('rtg_seq_order', $order)->where('rtg_com_type', $type)->where('rtg_id', $id)->delete();
    return "Rating was removed";
  }
  /// CALLED IN updateOrCreateCmpntncyRtng FUCNTION
  private function addCompetencies($competencies){
    if(isset($competencies)){
      $competencyQry = TbljvsCompetencies::where('com_type', $competencies['com_type'])->where('com_jvs_id', $competencies['com_jvs_id'])->first();
      if(isset($competencyQry)){
        TbljvsCompetencies::where('com_type', $competencies['com_type'])->where('com_jvs_id', $competencies['com_jvs_id'])->update([
            'com_jvs_id' => $competencies['com_jvs_id'],
            'com_type' => $competencies['com_type'],
            'com_specific' => $competencies['com_specific'],
        ]);
        if(!empty($competencies['tbl_com_type'])){
          $this->arrayRating($competencies['tbl_com_type'], $competencies['com_jvs_id'], $competencies['com_type']);
        }  
      } else {
        $create = new TbljvsCompetencies();
        $create->com_jvs_id = $competencies['com_jvs_id'];
        $create->com_type = $competencies['com_type'];
        $create->com_specific = $competencies['com_specific'];
        $create->save();

        if(!empty($competencies['tbl_com_type'])){
          $this->arrayRating($competencies['tbl_com_type'], $competencies['com_jvs_id'], $competencies['com_type']);
        }
      }
    }
  }
  /// CALLED IN updateOrCreateCmpntncyRtng FUCNTION
  private function arrayRating($ratings, $id ,$type){
    $count = 0;
    TbljvsCompetencyRatings::where('rtg_id', $id)->where('rtg_com_type', $type)->delete();
    foreach ($ratings as $value) {
      $count = $count + 1;
      $createQry = new TbljvsCompetencyRatings();
      $createQry->rtg_id = $id;
      $createQry->rtg_com_type = $value['rtg_com_type'];
      $createQry->rtg_seq_order = $count;
      $createQry->rtg_factor = $value['rtg_factor'];
      $createQry->rtg_percent = $value['rtg_percent'];
      $createQry->save();
    }
  }
  /// CALLED IN updateOrCreateCmpntncyRtng FUCNTION
  private function dutiesResponsibilities($request){
    $count = 0;
    $read = TbljvsDutiesRspnsblts::where('dty_jvs_id', $request->jvs_id)->get();
    if ($read){
      try {
        $read = TbljvsDutiesRspnsblts::where('dty_jvs_id', $request->jvs_id)->delete();
        foreach ($request->dty_res_item as $value) {
          $add = new TbljvsDutiesRspnsblts();
          $count = $count + 1;
          $add->dty_jvs_id = $request->jvs_id;
          $add->dty_jvs_order = $count;
          $add->dty_jvs_desc = $value['description'];
          $add->save();
        }
        return "Successfully updated";
  
      } catch (\Throwable $th) {
        foreach ($read as $value) {
          $add = new TbljvsDutiesRspnsblts();
          $count = $count + 1;
          $add->dty_jvs_id = $request->jvs_id;
          $add->dty_jvs_order = $count;
          $add->dty_jvs_desc = $value->dty_jvs_desc;
          $add->save();
        }
        throw $th;
      }
    }
  }

  private function onSubmitSign($request, $id){
    $applicantQry = Tbljvs::find($id);
    if(isset($request->pre_name) &&  isset($request->pre_sign) && isset($request->app_name) &&  isset($request->app_sign)){
      $this->generateAndSaveFile($request->jvs_id);
    }
    $pre_data = $request->pre_name . "|" . Carbon::now() . "|" . "";
    $app_data = $request->app_name . "|" . Carbon::now() . "|" . "";
    $applicantQry->jvs_prepared = $pre_data;
    $applicantQry->jvs_approved = $app_data;
    $applicantQry->save();
    return "Delivered";
  }
  private function generateAndSaveFile($id){
    $applicantQry = Tbljvs::find($id);
  }
  public function getImageSaved($id){
    $applicantQry = Tbljvs::find($id);
  }
  public function uploadImage($request, $id, $signType){
    $request->validate([
      'signature' => "required"
    ]);

    $jvsQry = Tbljvs::find($id);
    $uploadeDate =  Carbon::now(); 

    if($signType == "prepared"){
      if(isset($jvsQry->jvs_prepared)){      
        $arrCurrentData = explode("|", $jvsQry->jvs_prepared);
        $img = $arrCurrentData[2];
        if($img != ""){
          $public = public_path('storage/jvscrw/prepared/'.$img);
          unlink($public);
        }
      }

      $imageObj = $request->file('signature'); // Get image from request
      $extentionStr = $imageObj->getClientOriginalExtension(); // Get image name amd extension 
      $filenameStr = 'prepared-img-' . $uploadeDate . "." . $extentionStr; // Assign database name
      $imageObj->storeAs('public/jvscrw/prepared', $filenameStr); // Store image to storage folder
      $data = $request->name . "|" . $uploadeDate . "|" . $filenameStr;
      $jvsQry->jvs_prepared = $data;
    }

    if($signType == "approved"){
      if(isset($jvsQry->jvs_approved)){
        $arrCurrentData = explode("|", $jvsQry->jvs_approved);
        $img = $arrCurrentData[2];
        if($img != ""){
          $public = public_path('storage/jvscrw/approved/'.$img);
          unlink($public);
        }
      }

      $imageObj = $request->file('signature'); // Get image from request
      $extentionStr = $imageObj->getClientOriginalExtension(); // Get image name amd extension 
      $filenameStr = 'approved-img-' .$uploadeDate . "." . $extentionStr; // Assign database name
      $imageObj->storeAs('public/jvscrw/approved', $filenameStr); // Store image to storage folder
      $data = $request->name . "|" . $uploadeDate . "|" . $filenameStr;
      $jvsQry->jvs_approved = $data;
    }
    

    $jvsQry->save();
    return "Success";
    
  }
}



 // if(isset($competencyQry)){
        
    //     TbljvsCompetencies::where('com_type', $request->com_type)->where('com_jvs_id', $id)->update([
    //         'com_jvs_id' => $id,
    //         'com_type' => $request->com_type,
    //         'com_specific' => $request->com_specific,
    //     ]);
    //     $this->createRating($request, $id, $order);
    //     $output = "update";
    // }

    // if(!isset($competencyQry)){
        
        // $create = new TbljvsCompetencies();
        // $create->com_jvs_id = $id;
        // $create->com_type = $request->com_type;
        // $create->com_specific = $request->com_specific;
        // $create->save();
        // $this->createRating($request, $id);
    // }


    // private function createRating($request, $id, $order = null)
  // {

  //   $getSequenceQry = TbljvsCompetencyRatings::where('rtg_com_type', $request->com_type)->where('rtg_id', $id)->get();
  //   if($order == null){
  //     $createQry = new TbljvsCompetencyRatings();
  //     $createQry->rtg_id = $id;
  //     $createQry->rtg_com_type = $request->com_type;
  //     $createQry->rtg_seq_order = count($getSequenceQry)+1;
  //     $createQry->rtg_factor = $request->rtg_factor;
  //     $createQry->rtg_percent = $request->rtorderg_percent;
  //     $createQry->save();
  //   }

  //   if($order != null){
  //     TbljvsCompetencyRatings::where('rtg_seq_order', $order)->where('rtg_com_type', $request->com_type)->where('rtg_id', $id)->update([
  //       'rtg_factor' => $request->rtg_factor,
  //       'rtg_percent' => $request->rtg_percent
  //     ]);
  //   }
  // }



    // public function deleteDutiesResponsibilities($id, $request){
  //   $count = 0;
  //   $read = TbljvsDutiesRspnsblts::where('dty_jvs_id', $id)->get();
    
  //   try {
  //     $read = TbljvsDutiesRspnsblts::where('dty_jvs_id', $id)->delete();
      
  //     foreach ($request->dty_res_item as $value) {
  //       $add = new TbljvsDutiesRspnsblts();
  //       $count = $count + 1;
  //       $add->dty_jvs_id = $id;
  //       $add->dty_jvs_order = $count;
  //       $add->dty_jvs_desc = $value['description'];
  //       $add->save();
  //     }
  //     return "Successfully updated";

  //   } catch (\Throwable $th) {
  //     foreach ($read as $value) {
  //       $add = new TbljvsDutiesRspnsblts();
  //       $count = $count + 1;
  //       $add->dty_jvs_id = $id;
  //       $add->dty_jvs_order = $count;
  //       $add->dty_jvs_desc = $value->dty_jvs_desc;
  //       $add->save();
  //     }
  //     throw $th;
  //   }
  // }

     // foreach ($request->competencies as $value) {
    //     if(!empty($value)){
    //       $this->addCompetencies($value);
    //     }
    //   }
    // <<<<<<< Updated upstream   
     // $output = $request; 
// =======
//       return response()->json([
//         "status" => 200,
//         "message" => $request->competencies,
//       ]);
//     } else {
//       return response()->json([
//         "status" => 200,
//         "message" => "Created new version",
//       ]);
// >>>>>>> Stashed changes

