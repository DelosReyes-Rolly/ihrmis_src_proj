<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblApplicantReferenceCheckModel extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_reference_check';
    protected $primaryKey = 'chk_id';
    protected $fillable = [
        'chk_ref_id',
        'chk_ref_app_id',
        'chk_question',
        'chk_answer',
    ];

    public $timestamps = false;

    public function TblApplicantProfile()
    {
        return $this->hasOne(TblapplicantsProfile::class, 'app_id', 'chk_ref_app_id');
    }


}
