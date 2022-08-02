<?php

namespace App\Services\Applicant;

use App\Models\Applicants\TblapplicantAttachmentsModel;
use App\Models\Applicants\TblapplicantDocumentRequirementsModel;
use Illuminate\Http\Request;

class ApplicantDocumentRequirements
{

    public function saveDocuments(Request $request)
    {
        $arrFiles = [];
        $filenameStr = '';
        $applicantId = $request->applicant_id;
        $docType = $request->doc_type;
        $docName = '';
        $requiredDoc = TblapplicantDocumentRequirementsModel::where('doc_id', $docType)->first();
        if ($requiredDoc !== null) {
            $docName = $requiredDoc->doc_name;
            if ($request->doc_name == 'Other') {
                $docName = $request->doc_name;
            }
        }

        if (!empty($request->file(['documents']))) {
            foreach ($request->file(['documents']) as $value) {
                array_push($arrFiles, $value);
            }
        }
        foreach ($arrFiles as $file) {
            $original = $file->getClientOriginalName();
            $filenameStr = $docType . "-" . $applicantId . "-file-" . time() . "-" . $original;
            $file->storeAs('public/applicant/applicant-requirements', $filenameStr);
        }
        $dataToSave = new TblapplicantAttachmentsModel();
        $dataToSave->att_app_id = $applicantId;
        $dataToSave->att_app_doc_id = $docType;
        $dataToSave->att_app_name = $docName;
        $dataToSave->att_app_file = $filenameStr;
        $dataToSave->save();
        return $docName;
    }
}
