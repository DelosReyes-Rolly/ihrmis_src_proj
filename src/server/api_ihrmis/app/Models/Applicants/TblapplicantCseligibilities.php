<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantCseligibilities extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_cseligibilities';
    protected $primaryKey = 'cse_id';
    protected $fillable = [
        'cse_app_id',
        'cse_app_title',
        'cse_app_date',
        'cse_app_place',
        'cse_app_rating',
        'cse_app_license',
        'cse_app_validity',
    ];
    public $timestamps = false;
}
