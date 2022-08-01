<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Onboarding\NewAppointeesResource;
use App\Models\Applicants\Tblapplicants;

use Illuminate\Http\Request;

class TblapplicantsController extends Controller{
    public function getAppointedApplicantsWithEmpId()
    {
        $qry = Tblapplicants::where("app_onboarding_process", 1)->where("app_appointed", 1)->with("employee", "plantillaItems.tblpositions", "plantillaItems.tbloffices")->get();
        return NewAppointeesResource::collection($qry);
    }
}
