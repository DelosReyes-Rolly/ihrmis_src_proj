<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantAttachmentsModel;
use App\Models\Applicants\TblapplicantRequirements;
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
        $filenameArr = [];
        $requirementQry = TblapplicantAttachmentsModel::where('att_app_id', $id)->where('att_app_doc_id', $request->doc_id)->first();

        foreach ($request->file(['files']) as $file) {
            $original = $file->getClientOriginalName();
            $filenameStr = $request->doc_id . "-" . $id . "-file-" . time() . "-" . $original;
            $file->storeAs('public/applicant/applicant-docs', $filenameStr);
            $saveReqQry = new TblapplicantAttachmentsModel();
            $saveReqQry->att_app_id = $id;
            if ($request->doc_name != null) {
                $saveReqQry->att_app_name = $request->doc_name;
            }
            $saveReqQry->att_app_doc_id = $request->doc_id;
            $saveReqQry->att_app_name = $original;
            $saveReqQry->att_app_file = $filenameStr;
            $saveReqQry->save();
        }


        // if ($requirementQry !== null) {
        //     $stringName = $requirementQry->req_app_file;
        //     $storedFile = explode(",", $stringName);
        //     foreach ($storedFile as $file) {
        //         if (is_file(public_path("storage/applicant/applicant-docs/" . $file))) {
        //             unlink(public_path("storage/applicant/applicant-docs/" . $file));
        //         }
        //     }
        //     TblapplicantRequirements::where('req_app_doc_id', $request->doc_id)->where('req_app_id', $id)->delete();
        // }



        return $requirementQry;
        // $container = $this->appReqService->saveFiles($id, $request);
        // return $container;
        // return response()->json([
        //     'status' => 200,
        //     'message' => "Added Successfully",
        //     'Files' => $container
        // ]);
    }

    public function getDocuments($app_id)
    {
        $query = TblapplicantAttachmentsModel::where('att_app_id', $app_id)->get();
        return CommonResource::collection($query);
    }

    public function deleteDocuments($type)
    {
        return $this->appReqService->deleteFiles($type);
        return response()->json([
            'status' => 200,
            'message' => "Deleted Successfully",
        ]);
    }
}
