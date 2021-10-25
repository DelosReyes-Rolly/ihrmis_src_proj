<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblapplicants extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_profile';
    protected $primary = 'app_id';
    protected $fillable = [
        'app_emp_no',
        'app_nm_last',
        'app_nm_first',
        'app_nm_mid',
        'app_nm_extn',
        'app_birth_date',
        'app_birth_place',
        'app_sex',
        'app_blood_type',
        'app_civil_status',
        'app_civil_others',
        'app_height',
        'app_weight',
        'app_gsis',
        'app_pagibig',
        'app_philhealth',
        'app_sss',
        'app_tin',
        'app_filipino',
        'app_dual_type',
        'app_dual_cny_id',
        'app_resident_addr',
        'app_permanent_addr',
        'app_tel_no',
        'app_mobile_no',
        'app_email_addr',
        'app_id_issued',
        'app_id_no',
        'app_id_dateplace',
        'app_agree',
    ];

    public $timestamps = false;

    public function tblapplicantChildren(){
        return $this->hasMany(TblapplicantChildren::class, 'chi_app_id' ,'app_id');
    }

}
