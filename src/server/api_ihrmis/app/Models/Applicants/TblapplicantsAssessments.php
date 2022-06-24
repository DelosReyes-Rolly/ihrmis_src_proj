<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantsAssessments extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_assessments';
    protected $primaryKey = 'ass_id';
    protected $fillable = [
        'ass_app_id',
        'ass_education',
        'ass_experience',
        'ass_training',
        'ass_remarks',
        'ass_exam_date',
        'ass_exam_remarks',
        'ass_psych_date',
        'ass_psych_remarks',
        'ass_psb_eval_date',
        'ass_attribute',
        'ass_accomplishment',
        'ass_performance',
    ];

    public $timestamps = false;
}
