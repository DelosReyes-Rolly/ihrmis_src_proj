<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeChildren extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_children';
    protected $primaryKey = 'chi_emp_id';
    protected $fillable = [
        'chi_emp_id',
        'chi_emp_name',
        'chi_emp_birthdate',
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
        'emp_dual_cny_id',
        'emp_resident_addr',
        'emp_permanent_addr',
        'emp_tel_no',
        'emp_mobile_no',
        'emp_email_addr',
        'emp_id_issued',
        'emp_id_dateplace',
        'emp_photo',
        'emp_agree'
    ];

    public $timestamps = false;
    
    public function tblapplicant()
    {
        return $this->belongsTo(TblEmployees::class, 'emp_id', 'chi_emp_id');
    }
}
