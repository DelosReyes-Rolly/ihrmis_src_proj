<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantExperiences extends Model
{
    use HasFactory;
    
    protected $table = 'tblapplicants_experiences';
    protected $primaryKey = 'exp_id';
    protected $fillable = [
        'exp_app_id',
        'exp_app_from',
        'exp_app_to',
        'exp_app_position',
        'exp_app_agency',
        'exp_app_salary',
        'exp_app_grade',
        'exp_app_step',
        'exp_app_appntmnt',
        'exp_app_govt',
    ];
    
    public $timestamps = false;
}
