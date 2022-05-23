<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Models\TblTransactionStages;
use Illuminate\Http\Request;

class TblTransactionStagesController extends Controller
{
    public function getTransactionStage($cluster)
    {
        $requirements = TblTransactionStages::where('stg_cluster', $cluster)->orderBy('stg_order','asc')->get();
        return CommonResource::collection($requirements);
    }
}
