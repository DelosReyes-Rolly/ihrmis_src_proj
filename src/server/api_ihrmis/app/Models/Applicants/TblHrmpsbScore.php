<?php

namespace App\Models\Applicants;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblHrmpsbScore extends Model
{
    use HasFactory;

    protected $table = 'tblhrmpsb_scores';
    protected $primaryKey = 'hrmpsb_score_id';

    protected $fillable = [
        'hrmpsb_user_id',
        'hrmpsb_app_id',
        'hrmpsb_type',
        'hrmpsb_score',
        'hrmpsb_remarks',
    ];

    public $timestamps = false;

    public function TblAssessment()
    {
        return $this->hasOne(TblapplicantsAssessments::class, 'ass_app_id', 'hrmpsb_app_id');
    }

    public function TblUser()
    {
        return $this->hasOne(User::class, 'user_id', 'hrmpsb_user_id');
    }
}
