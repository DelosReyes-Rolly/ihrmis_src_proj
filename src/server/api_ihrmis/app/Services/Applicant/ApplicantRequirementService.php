<?php

namespace App\Services\Applicant;

use Illuminate\Http\Request;

use App\Models\Applicants\TblapplicantRequirements;



class ApplicantRequirementService
{

    /**
     * Store an array of files uplaoded by client
     * 
     * @param Request $uploadedFiles accept an array of file sent by the client.
     */
    public function saveFiles($id, $uploadedFiles)
    {
        // $uploadedFiles->validate([
        //     "app_letter_file" => "required_if:app_letter,1",
        //     "app_letter_file.*" => "mimes:zip,pdf|max:5120",
        //     //pds
        //     "app_pds_file" => "required_if:app_pds,1",
        //     "app_pds_file.*" => "mimes:zip,pdf|max:5120",
        //     // WORK EXP     
        //     "app_work_file" => "required_if:app_work,1",
        //     "app_work_file.*" => "mimes:zip,pdf|max:5120",
        //     // DIPLOMA 
        //     "app_diploma_file" => "required_if:app_diploma,1",
        //     "app_diploma_file.*" => "mimes:zip,pdf|max:5120",
        //     // TOR
        //     "app_tor_file" => "required_if:app_tor,1",
        //     "app_tor_file.*" => "mimes:zip,pdf|max:5120",
        //     // eligibitity
        //     "app_eligibility_file" => "required_if:app_eligibility,1",
        //     "app_eligibility_file.*" => "mimes:zip,pdf|max:5120",
        //     // Training
        //     "app_training_file" => "required_if:app_training,1",
        //     "app_training_file.*" => "mimes:zip,pdf|max:5120",
        //     // Evaluation
        //     "app_evaluation_file" => "required_if:app_evaluation,1",
        //     "app_evaluation_file.*" => "mimes:zip,pdf|max:5120",
        //     // Coe
        //     "app_coe_file" => "required_if:app_coe,1",
        //     "app_coe_file.*" => "mimes:zip,pdf|max:5120",
        //     // NBI
        //     "app_nbi_file" => "required_if:app_nbi,1",
        //     "app_nbi_file.*" => "mimes:zip,pdf|max:5120",
        //     // Others
        //     "app_others" => "required_with:app_others_file",
        //     "app_others_file.*" => "mimes:zip,pdf|max:5120",
        // ]);

        $fileNameArr = [];

        if ($uploadedFiles->hasFile('files')) {
            $container = $this->destructuringArrayFiles($id, $uploadedFiles->files, $uploadedFiles->doc_id, $uploadedFiles->doc_id);
            array_push($fileNameArr, $container);
        }

        // if ($uploadedFiles->hasFile('app_pds_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_pds_file'), "pds", 2);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_work_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_work_file'), "work", 3);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_diploma_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_diploma_file'), "diploma", 4);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_tor_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_tor_file'), "tor", 5);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_eligibility_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_eligibility_file'), "eligibility", 6);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_training_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_training_file'), "training", 7);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_evaluation_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_evaluation_file'), "evaluation", 8);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_coe_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_coe_file'), "coe", 9);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_nbi_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_nbi_file'), "nbi", 10);
        //     array_push($fileNameArr, $container);
        // }

        // if ($uploadedFiles->hasFile('app_others_file')) {
        //     $container = $this->destructuringArrayFiles($id, $uploadedFiles->file('app_others_file'), $uploadedFiles->app_others, 11);
        // }
        return $fileNameArr;
    }

    private function destructuringArrayFiles($userId, $files, $label, $labelId)
    {
        $filenameArr = [];
        $requirementQry = TblapplicantRequirements::where('req_app_id', $userId)->where('req_app_doc_id', $labelId)->first();

        foreach ($files as $file) {
            $original = $file->getClientOriginalName();
            $filenameStr = $label . "-" . $userId . "-file-" . time() . "-" . $original;
            $file->storeAs('public/applicant/applicant-docs', $filenameStr);
            array_push($filenameArr, $filenameStr);
        }

        $stringFileName = implode(",", $filenameArr);

        if ($requirementQry !== null) {
            $stringName = $requirementQry->req_app_file;
            $storedFile = explode(",", $stringName);
            foreach ($storedFile as $file) {
                if (is_file(public_path("storage/applicant/applicant-docs/" . $file))) {
                    unlink(public_path("storage/applicant/applicant-docs/" . $file));
                }
            }
            TblapplicantRequirements::where('req_app_doc_id', $labelId)->where('req_app_id', $userId)->delete();
        }

        $saveReqQry = new TblapplicantRequirements();
        $saveReqQry->req_app_id = $userId;
        $saveReqQry->req_app_doc_id = $labelId;
        $saveReqQry->req_app_file = $stringFileName;
        $saveReqQry->save();

        return $saveReqQry;
    }

    public function deleteFiles($type)
    {

        $query = TblapplicantRequirements::where('req_app_doc_id', $type)->first();
        $stringFileName = explode(",", $query->req_app_file);
        foreach ($stringFileName as $file) {
            if (is_file(public_path("storage/applicant/applicant-docs/" . $file))) {
                unlink(public_path("storage/applicant/applicant-docs/" . $file));
            }
        }
        TblapplicantRequirements::where('req_app_doc_id', $type)->delete();
        return $query;
    }
}
