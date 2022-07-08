<?php

namespace App\Http\Controllers\Applicant;


use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantAttachmentsModel;
use App\Models\Applicants\TblapplicantDocumentRequirementsModel;
use App\Models\Library\CategoryGroupModel;
use App\Services\Applicant\ApplicantDocumentRequirements;
use Illuminate\Http\Request;

class TblapplicantDocumentRequirements extends Controller
{
    protected $appDocumentService;

    public function __construct(ApplicantDocumentRequirements $appService)
    {
        $this->appDocumentService = $appService;
    }

    public function getRequirentsByGroup($grpLevel, $grpCluster)
    {
        $requirements = CategoryGroupModel::with('ApplicantRequirements')->where('grp_level', $grpLevel)->where('grp_cluster', $grpCluster)->get();
        // $requirements = TblapplicantDocumentRequirementsModel::with(['tblCategory' => function ($query) use ($grpLevel, $grpCluster) {
        //     $query->where('grp_level', $grpLevel)->where('grp_cluster', $grpCluster)->get();
        // }])->get();
        return CommonResource::collection($requirements);
    }

    public function getUploadedRequirementsbyApplicant($grp_id, $app_id)
    {
        $requirements = TblapplicantDocumentRequirementsModel::with(['tbldocumentaryAttachments' => function ($query) use ($app_id) {
            $query->where('att_app_id', $app_id)->get();
        }])->where('doc_group', $grp_id)->get();
        return CommonResource::collection($requirements);
    }

    public function saveApplicantDocument(Request $request)
    {
        $message = $this->appDocumentService->saveDocuments($request);
        return $message;
        // $fileNameWithExt = $request->file('documents')->getClientOriginalName();
    }

    public function deleteApplicantDocument($att_id)
    {
        $query = TblapplicantAttachmentsModel::where('att_id', $att_id)->first();
        if ($query !== null) {
            $stringName = $query->att_app_file;
            $storedFile = explode(",", $stringName);
            foreach ($storedFile as $file) {
                if (is_file(public_path("storage/applicant/applicant-requirements/" . $file))) {
                    unlink(public_path("storage/applicant/applicant-requirements/" . $file));
                }
            }
            TblapplicantAttachmentsModel::where('att_id', $att_id)->delete();
        }
        return ($query->att_app_file);
    }
}
