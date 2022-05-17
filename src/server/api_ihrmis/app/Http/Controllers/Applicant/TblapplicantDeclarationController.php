<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantDeclarationResource;
use App\Models\Applicants\TblapplicantDeclarations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class TblapplicantDeclarationController extends Controller
{
    public function onSubmitDecleration($id, Request $request)
    {
        
        $request->validate(
            [ // RULES
                'Q1A' => 'required',
                'Q1B' => 'required',
                'Q2A' => 'required',
                'Q2B' => 'required',
                'Q3' => 'required',
                'Q4' => 'required',
                'Q5A' => 'required',
                'Q5B' => 'required',
                'Q6' => 'required',
                'Q7A' => 'required',
                'Q7B' => 'required',
                'Q7C' => 'required',

                'Q1B_spec' => 'required_if:Q1B, 1',
                // 'Q2A_spec' => 'required_if:Q2A, 1',
                'Q2B_spec' => 'required_if:Q2B, 1',
                'Q3_spec' => 'required_if:Q3, 1',
                'Q4_spec' => 'required_if:Q4, 1',
                'Q5A_spec' => 'required_if:Q5A, 1',
                'Q5B_spec' => 'required_if:Q5B, 1',
                'Q6_spec' => 'required_if:Q6, 1',
                'Q7A_spec' => 'required_if:Q7A, 1',
                'Q7B_spec' => 'required_if:Q7B, 1',
                'Q7C_spec' => 'required_if:Q7C, 1',

                'Q2B_date' => 'required_if:Q2B, 1',
            ],
            [ // ERROR MESSAGE
                'required' => 'This field is required',
                'required_if' => 'This field is required',
            ]
        );
        
        $declarationArr = [
            [ "dec_app_question" => "Q1A", "dec_app_yes"=> $request->Q1A, "dec_app_details"=> "N/A", "dec_app_date"=> null],
            [ "dec_app_question" => "Q1B", "dec_app_yes"=> $request->Q1B, "dec_app_details"=> $request->Q1B_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q2A", "dec_app_yes"=> $request->Q2A, "dec_app_details"=> $request->Q2A_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q2B", "dec_app_yes"=> $request->Q2B, "dec_app_details"=> $request->Q2B_spec, "dec_app_date"=> $request->Q2B_date],
            [ "dec_app_question" => "Q3", "dec_app_yes"=> $request->Q3, "dec_app_details"=> $request->Q3_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q4", "dec_app_yes"=> $request->Q4, "dec_app_details"=> $request->Q4_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q5A", "dec_app_yes"=> $request->Q5A, "dec_app_details"=> $request->Q5A_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q5B", "dec_app_yes"=> $request->Q5B, "dec_app_details"=> $request->Q5B_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q6", "dec_app_yes"=> $request->Q6, "dec_app_details"=> $request->Q6_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q7A", "dec_app_yes"=> $request->Q7A, "dec_app_details"=> $request->Q7A_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q7B", "dec_app_yes"=> $request->Q7B, "dec_app_details"=> $request->Q7B_spec, "dec_app_date"=> null],
            [ "dec_app_question" => "Q7C", "dec_app_yes"=> $request->Q7C, "dec_app_details"=> $request->Q7C_spec, "dec_app_date"=> null],
        ];

     
        foreach ($declarationArr as $value) {
            $isExisting = TblapplicantDeclarations::where('dec_app_question', $value['dec_app_question'])->where('dec_app_id', $id)->first();
            if($isExisting == null){
                $declaration = new TblapplicantDeclarations();
                $declaration->dec_app_id = $id;
                $declaration->dec_app_question = $value['dec_app_question'];
                $declaration->dec_app_yes = $value['dec_app_yes'];
                $declaration->dec_app_details = $value['dec_app_details'] ?? "N/A";
                $declaration->dec_app_date = $value['dec_app_date'] ?? null;
                $declaration->save();
            } else {
                TblapplicantDeclarations::where('dec_app_question', $value['dec_app_question'])->where('dec_app_id', $id)->update([
                    'dec_app_id' => $id,
                    'dec_app_question' => $value['dec_app_question'],
                    'dec_app_yes' => $value['dec_app_yes'],
                    'dec_app_details' => $value['dec_app_details'] ?? "N/A",
                    'dec_app_date' => $value['dec_app_date'] ?? null,
                ]);
            }
            
        }
        
        return response()->json([
            'status' => 200,
            'message' => "Added Succesfully",
        ]);
    
    }
    
    public function getDataDeclaration($id)
    {
        $declarationQry = TblapplicantDeclarations::where('dec_app_id', $id)->get();

        return new ApplicantDeclarationResource($declarationQry);
    }
}
