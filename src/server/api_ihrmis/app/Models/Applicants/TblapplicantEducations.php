<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantEducations extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_educations';
    protected $primaryKey = 'edu_app_idref';
    protected $fillable = [
        'edu_app_id',
        'edu_app_idref',
        'edu_app_time',
        'edu_app_level',
        'edu_app_shcool',
        'edu_app_from',
        'edu_app_to',
        'edu_app_degree',
        'edu_app_graduated',
        'edu_app_units',
        'edu_app_honors',
    ];
    
    public $timestamps = false;
}
