<?php

namespace App\Http\Controllers;

use App\Models\DevPlanPeriods;
use Illuminate\Http\Request;

class DevPlanPeriodsController extends Controller
{
    public function addPeriod(Request $request)
    {
        try {
            $qryAddPerson = new DevPlanPeriods();
            $qryAddPerson->prd_start = $request->prd_start;
            $qryAddPerson->prd_end = $request->prd_end;
            $qryAddPerson->prd_title = $request->prd_title;
            $qryAddPerson->save();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'May error'
            ], 200);
        }

        return response()->json([
            'message' => 'Successfully Added'
        ], 200);
    }
}
