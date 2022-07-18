<?php

namespace App\Http\Controllers\Applicant;


use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantAttachmentsModel;
use App\Models\Applicants\TblapplicantDocumentRequirementsModel;
use App\Models\Applicants\TblapplicantRequirements;
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
        $cat = CategoryGroupModel::where('grp_level', $grpLevel)->where('grp_cluster', $grpCluster)->first();

        $requirements = TblapplicantDocumentRequirementsModel::with([
            'TblApplicantRequirements'
        ])->where('doc_group', $cat->grp_id)->get();
        // $requirements = TblapplicantDocumentRequirementsModel::with(['tblCategory' => function ($query) use ($grpLevel, $grpCluster) {
        //     $query->where('grp_level', $grpLevel)->where('grp_cluster', $grpCluster)->get();
        // }])->get();
        return CommonResource::collection($requirements);
    }

    public function getUploadedRequirementsbyApplicant($grpLevel, $grpCluster, $app_id)
    {
        $cat = CategoryGroupModel::where('grp_level', $grpLevel)->where('grp_cluster', $grpCluster)->first();

        $requirements = TblapplicantDocumentRequirementsModel::with(['TblApplicantRequirements' => function ($query) use ($app_id) {
            $query->where('req_app_id', $app_id)->get();
        }])->where('doc_group', $cat->grp_id)->get();
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
        $query = TblapplicantRequirements::where('id', $att_id)->first();
        if ($query !== null) {
            $stringName = $query->req_app_file;
            $storedFile = explode(",", $stringName);
            foreach ($storedFile as $file) {
                if (is_file(public_path("storage/applicant/applicant-docs/" . $file))) {
                    unlink(public_path("storage/applicant/applicant-docs/" . $file));
                }
            }
            TblapplicantRequirements::where('id', $att_id)->delete();
            return ($query->req_app_file);
        }
    }
}
