<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblApplicantReferenceCheckModel;
use App\Models\Applicants\TblapplicantsProfile;
use Illuminate\Http\Request;

class TblApplicantReferenceCheck extends Controller
{
    public function getReferenceCheck($reference)
    {
        return new CommonResource(
            TblapplicantsProfile::whereHas('tblReferenceChecks', function ($query) use ($reference) {
                return $query->where('tblapplicants_reference_check.chk_ref_id', $reference);
            })->with('tblReferenceChecks')->first()
        );
    }



    public function addReferenceCheckAnswer(Request $request)
    {
        $requestKeys = collect($request->all())->keys();
        $arr = [];
        foreach ($requestKeys as $key) {
            if (($key) != 'reference' && $key != 'applicant_id' && $key != 9) {
                $arr[$key] = $request[$key];
                $query = TblApplicantReferenceCheckModel::firstOrNew(
                    ["chk_ref_id" => $request->reference, "chk_question" => $key]
                );
                if ($query->chk_question == 'nine') {
                    $query->chk_question = 9;
                } else {
                    $query->chk_question = $key;
                }
                $query->chk_answer = $request[$key];
                $query->chk_ref_id = $request->reference;
                $query->chk_ref_app_id = $request->applicant_id;
                if ($query->chk_answer != null) {
                    $query->save();
                }
                $arr[] = $query;
            }
        }
        return $arr;
    }
}
