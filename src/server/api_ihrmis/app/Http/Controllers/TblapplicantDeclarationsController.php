<?php

namespace App\Http\Controllers;

use App\Models\Applicants\TblapplicantDeclarations;
use Illuminate\Http\Request;

class TblapplicantDeclarationsController extends Controller
{

    public function store($id, Request $request)
    {

        if (isset($request->declaration)){
            foreach ($request->declaration as $value) {
                TblapplicantDeclarations::updateOrCreate([
                    'dec_app_id' => $id,
                    'dec_app_question' => $value['dec_app_question'],
                    'dec_app_yes' => $value['dec_app_yes'],
                    'dec_app_details' => $value['dec_app_details'],
                    'dec_app_date' => $value['dec_app_date'],
                ]);   
            }
        }

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }
}
