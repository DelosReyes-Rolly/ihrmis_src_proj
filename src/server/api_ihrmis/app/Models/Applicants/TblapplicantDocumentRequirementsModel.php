<?php

namespace App\Models\Applicants;

use App\Models\Library\CategoryGroupModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantDocumentRequirementsModel extends Model
{
    use HasFactory;

    protected $table = 'tbldocumentary_requirements';
    protected $primaryKey = 'doc_id';
    protected $fillable = [
        'doc_name',
        'doc_group',
    ];

    public $timestamps = false;

    public function TblApplicantRequirements()
    {
        return $this->hasMany(TblapplicantRequirements::class, 'req_app_doc_id', 'doc_id');
    }

    public function tbldocumentaryAttachments()
    {
        return $this->hasMany(TblapplicantAttachmentsModel::class, 'att_app_doc_id', 'doc_id');
    }

    public function tblCategory()
    {
        return $this->hasOne(CategoryGroupModel::class, 'grp_id', 'doc_group');
    }
}
