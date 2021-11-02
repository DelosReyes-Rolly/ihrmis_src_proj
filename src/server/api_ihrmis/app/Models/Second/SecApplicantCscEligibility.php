<?php

namespace App\Models\Second;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecApplicantCscEligibility extends Model
{
    use HasFactory;

    public $connection="mysql2";
    protected $table = 'sec_applicants_cseligibilities';
    protected $primaryKey = 'cse_app_id';
    protected $fillable = [
        'cse_app_id',
        'cse_app_time',
        'cse_app_title',
        'cse_app_date',
        'cse_app_place',
        'cse_app_rating',
        'cse_app_license',
        'cse_app_validity',
    ];
    public $timestamps = false;

}
