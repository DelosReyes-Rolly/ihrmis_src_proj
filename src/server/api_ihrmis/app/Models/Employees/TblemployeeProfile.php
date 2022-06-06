<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeProfile extends Model
{
    use HasFactory;
    protected $table = 'tblemployee_profile';
    protected $primaryKey = 'emp_id';
    protected $fillable = [
        'emp_id',
        'emp_birth_date',
        'emp_birth_place',
        'emp_sex',
        'emp_blood_type',
        'emp_civil_status',
        'emp_civil_others',
        'emp_height',
        'emp_weight',
        'emp_gsis',
        'emp_pagibig',
        'emp_philhealth',
        'emp_sss',
        'emp_tin',
        'emp_filipino',
        'emp_dual_type',
        'emp_dual_cny_id',
        'emp_resident_addr',
        'emp_permanent_addr',
        'emp_tel_no',
        'emp_mobile_no',
        'emp_email_addr',
        'emp_id_issued',
        'emp_id_no',
        'emp_id_dateplace',
        'emp_agree',
        'emp_photo',
        'is_verified',
    ];

    public $timestamps = false;

    public function tblemployeeChildren(){
        return $this->hasMany(TblemployeeChildren::class, 'chi_emp_id' ,'emp_id');
    }
}
