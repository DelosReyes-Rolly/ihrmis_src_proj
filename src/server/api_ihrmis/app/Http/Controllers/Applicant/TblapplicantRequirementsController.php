<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Services\Applicant\ApplicantRequirementService;

use Illuminate\Http\Request;

class TblapplicantRequirementsController extends Controller
{
    
    protected $appReqService;

    public function __construct(ApplicantRequirementService $appReqService)
    {
        $this->appReqService = $appReqService;
    }
    
    public function addDocuments($id, Request $request)
    {
        
        $container = $this->appReqService->saveFiles($id, $request); 

        return response()->json([
            'status' => 200,
            'message' => "Added Successfully",
            'Files' => $container 
        ]);
    }

}
