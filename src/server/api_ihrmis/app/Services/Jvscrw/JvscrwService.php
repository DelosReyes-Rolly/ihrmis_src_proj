<?php
namespace App\Services\Jvscrw;

use App\Models\TbljvsCompetencies;
use App\Models\TbljvsCompetencyRatings;
use App\Models\TbljvsDutiesRspnsblts;

class JvscrwService {
  public function updateOrCreateCmpntncyRtng($request, $id, $order=null)
  {
    $competencyQry = TbljvsCompetencies::where('com_type', $request->com_type)->where('com_jvs_id', $id)->first();
    $output = "";

    if(isset($competencyQry)){
        
        TbljvsCompetencies::where('com_type', $request->com_type)->where('com_jvs_id', $id)->update([
            'com_jvs_id' => $id,
            'com_type' => $request->com_type,
            'com_specific' => $request->com_specific,
        ]);
        $this->createRating($request, $id, $order);
        $output = "update";
    }

    if(!isset($competencyQry)){
        
        $create = new TbljvsCompetencies();
        $create->com_jvs_id = $id;
        $create->com_type = $request->com_type;
        $create->com_specific = $request->com_specific;
        $create->save();
        $this->createRating($request, $id);
        $output = "create";
    }

    return $output;
  }


  private function createRating($request, $id, $order = null)
  {

    $getSequenceQry = TbljvsCompetencyRatings::where('rtg_com_type', $request->com_type)->where('rtg_id', $id)->get();
    if($order == null){
      $createQry = new TbljvsCompetencyRatings();
      $createQry->rtg_id = $id;
      $createQry->rtg_com_type = $request->com_type;
      $createQry->rtg_seq_order = count($getSequenceQry)+1;
      $createQry->rtg_factor = $request->rtg_factor;
      $createQry->rtg_percent = $request->rtorderg_percent;
      $createQry->save();
    }

    if($order != null){
      TbljvsCompetencyRatings::where('rtg_seq_order', $order)->where('rtg_com_type', $request->com_type)->where('rtg_id', $id)->update([
        'rtg_factor' => $request->rtg_factor,
        'rtg_percent' => $request->rtg_percent
      ]);
    }
  }

  public function deleteRating($id, $order, $type){
    TbljvsCompetencyRatings::where('rtg_seq_order', $order)->where('rtg_com_type', $type)->where('rtg_id', $id)->delete();
    return "Rating was removed";
  }

  public function deleteDutiesResponsibilities($id, $request){
    $count = 0;
    $read = TbljvsDutiesRspnsblts::where('dty_jvs_id', $id)->get();
    
    try {
      $read = TbljvsDutiesRspnsblts::where('dty_jvs_id', $id)->delete();
      
      foreach ($request->dty_res_item as $value) {
        $add = new TbljvsDutiesRspnsblts();
        $count = $count + 1;
        $add->dty_jvs_id = $id;
        $add->dty_jvs_order = $count;
        $add->dty_jvs_desc = $value['description'];
        $add->save();
      }
      return "Successfully updated";

    } catch (\Throwable $th) {
      foreach ($read as $value) {
        $add = new TbljvsDutiesRspnsblts();
        $count = $count + 1;
        $add->dty_jvs_id = $id;
        $add->dty_jvs_order = $count;
        $add->dty_jvs_desc = $value->dty_jvs_desc;
        $add->save();
      }
      throw $th;
    }
  }

  public function uploadImage($id, $request){
    
  }
}