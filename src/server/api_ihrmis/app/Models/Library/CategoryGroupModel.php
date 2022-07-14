<?php

namespace App\Models\Library;

use App\Models\Applicants\TblapplicantAttachmentsModel;
use App\Models\Applicants\TblapplicantDocumentRequirementsModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryGroupModel extends Model
{
    use HasFactory;

    protected $table = 'tblcategory_groups';
    protected $primaryKey = 'grp_id';

    protected $fillable = [
        'grp_name',
        'grp_level',
        'grp_cluster',
    ];

    public $timestamps = false;

    public function ApplicantRequirements()
    {
        return $this->hasMany(TblapplicantDocumentRequirementsModel::class, 'doc_group', 'grp_id');
    }

    public function tbldocumentaryAttachments()
    {
        return $this->hasManyThrough(TblapplicantAttachmentsModel::class, TblapplicantDocumentRequirementsModel::class, 'doc_id', 'att_app_doc_id', 'grp_id', 'doc_group');
    }
}
