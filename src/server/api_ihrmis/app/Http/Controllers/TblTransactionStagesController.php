<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Models\TblTransactionStages;
use Illuminate\Http\Request;

class TblTransactionStagesController extends Controller
{
    public function getTransactionStage($cluster)
    {
        $requirements = TblTransactionStages::whereHas('Category', function ($q) use ($cluster) {
            $q->where('grp_cluster', $cluster);
        })->get();
        return CommonResource::collection($requirements);
    }
}
