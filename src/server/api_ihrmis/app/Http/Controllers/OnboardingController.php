<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Models\TblonboardingSectionItems;
use App\Models\TblonboardingSections;
use Illuminate\Http\Request;

class OnboardingController extends Controller{
    public function getOnboardingSections(){
        $qry = TblonboardingSections::orderBy('sec_onb_order', 'ASC')->get();
        return CommonResource::collection($qry);
    }

    public function addOnboardingSections(Request $request){
        try {
            $qry = TblonboardingSections::get(); $value = 0;
            foreach ($qry as $item) {
                if($item->sec_onb_order > $value) $value = $item->sec_onb_order;
            }
            $qryAdd = new TblonboardingSections();
            $qryAdd->sec_onb_order = $value + 1;
            $qryAdd->sec_onb_name = $request->sec_onb_name;
            $qryAdd->save();

            $returningValue = TblonboardingSections::get();
            return CommonResource::collection($returningValue);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function updateOnboardingSections(Request $request){
        try {
            foreach ($request->item as $key => $value) {
                $qryUpdate = TblonboardingSections::where('sec_onb_id', $value["sec_onb_id"])->first();
                $qryUpdate->sec_onb_order = $key + 1;
                $qryUpdate->save();
            }
            return response()->json([
                'message' => "Successfully Modified order"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function removeOnboardingSections($secId){
        try {
            TblonboardingSections::where('sec_onb_id', $secId)->delete();
            TblonboardingSectionItems::where('itm_sec_onb_id', $secId)->delete();
            $qrySecs = TblonboardingSections::orderBy('sec_onb_order', 'ASC')->get();
            return CommonResource::collection($qrySecs);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    public function getSectionItemBySectionId($secId) {
        $qry = TblonboardingSectionItems::where('itm_sec_onb_id', $secId)->orderBy('itm_onb_order', 'ASC')->get();
        return CommonResource::collection($qry);
    }

    public function addSectionItemBySectionId(Request $request) {

        $value = 0;
        $qry = TblonboardingSectionItems::where('itm_sec_onb_id', $request->itm_sec_onb_id)->get(); 
        foreach ($qry as $item) {
            if($item->itm_onb_order > $value) $value = $item->itm_onb_order;
        }
        $qry = new TblonboardingSectionItems();
        $qry->itm_sec_onb_id = $request->itm_sec_onb_id;
        $qry->itm_onb_order = $value + 1;
        $qry->itm_onb_name = $request->itm_onb_name;
        $qry->itm_onb_url = $request->itm_onb_url;
        $qry->itm_onb_content = $request->itm_onb_content;
        $qry->save();

        return response()->json([
            "message" => "Successfully Added"
        ], 200);
    }

    public function updateOnboardingSectionsItemOrder(Request $request){
        try {
            foreach ($request->item as $key => $value) {
                $qryUpdate = TblonboardingSectionItems::where('itm_onb_id', $value["itm_onb_id"])->first();
                $qryUpdate->itm_onb_order = $key + 1;
                $qryUpdate->save();
            }
            return response()->json([
                'message' => "Successfully Modified order"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error, Try again later!"
            ], 400);
        }
    }

    
}
