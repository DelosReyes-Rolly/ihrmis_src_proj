<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantAttachmentsModel extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_attachments';
    protected $primaryKey = 'att_app_id';
    protected $fillable = [
        'att_app_time',
        'att_app_doc_id',
        'att_app_name',
        'att_app_file',
    ];

    public $timestamps = false;

    public function tbldocumentaryRequirements()
    {
        return $this->hasOne(TblapplicantDocumentRequirementsModel::class,'doc_id','att_app_doc_id');
    }
}
