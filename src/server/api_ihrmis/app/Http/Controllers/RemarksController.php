<?php

namespace App\Http\Controllers;

use App\Models\Remarks;
use Illuminate\Http\Request;

class RemarksController extends Controller
{
    public function getRemarks() {
        $qryPerson = Remarks::get();
        return $qryPerson;
    }

    public function addRemarks(Request $request)
    {
        // try {
            $qryAddRemarks = new Remarks();
            $qryAddRemarks->remarks = $request->remarks;
            $qryAddRemarks->save();
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'message' => 'Failed. Try again later.'
        //     ], 400);
        // }

        return response()->json([
            'message' => 'Successfully Added.'
        ], 200);
    }
}
