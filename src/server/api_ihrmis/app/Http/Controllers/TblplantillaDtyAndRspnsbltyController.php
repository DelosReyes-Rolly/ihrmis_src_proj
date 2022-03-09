<?php

namespace App\Http\Controllers;

use App\Models\TblplantillaDutiesRspnsblts;
use Illuminate\Http\Request;

class TblplantillaDtyAndRspnsbltyController extends Controller
{
    public function addDutiesAndResponsibilities(Request $request, $id)
    {   
        $request->validate([
            "dty_respo" => "required"
        ]);

        $counter = 0;
        $dtyResFindQry = TblplantillaDutiesRspnsblts::where("dty_itm_id", $id)->get();
        if($dtyResFindQry){
            TblplantillaDutiesRspnsblts::where("dty_itm_id", $id)->delete();
            foreach ($request->dty_respo as $value) {
                $counter++;
                $this->newDtyRspnsblty($value, $counter, $id);
            }
            return response()->json([
                "message" => "Successfully edited"
            ]);

        } else {
            
            foreach ($request->dty_respo as $value) {
                $counter++;
                $this->newDtyRspnsblty($value, $counter, $id);
            }

            return response()->json([
                "message" => "Successfully added"
            ]);
        }
    }

    private function newDtyRspnsblty($value, $order, $id)
    {
        $dtyResAddQry = new TblplantillaDutiesRspnsblts();
        $dtyResAddQry->dty_itm_id = $id;
        $dtyResAddQry->dty_itm_order = $order;
        $dtyResAddQry->dty_itm_desc = $value["dty_itm_desc"];
        $dtyResAddQry->dty_itm_percent = $value["dty_itm_percent"];
        $dtyResAddQry->dty_itm_cmptncy = $value["dty_itm_cmptncy"];
        $dtyResAddQry->save();
    }
}
