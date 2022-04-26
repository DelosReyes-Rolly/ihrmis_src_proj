<?php

namespace App\Http\Controllers\Applicant;


use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantAttachmentsModel;
use App\Models\Applicants\TblapplicantDocumentRequirementsModel;
use Illuminate\Http\Request;

class TblapplicantDocumentRequirements extends Controller
{
    public function getRequirentsByGroup($grp_id)
    {
        $requirements = TblapplicantDocumentRequirementsModel::where('doc_group', $grp_id)->get();
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
        $arrFiles=[];
        if (!empty($request->file(['documents']))) {
            foreach ($request->file(['documents']) as $value) {
                array_push($arrFiles, $value);
            }
        }
        var_dump($arrFiles);
        // $fileNameWithExt = $request->file('documents')->getClientOriginalName();
    }
}
