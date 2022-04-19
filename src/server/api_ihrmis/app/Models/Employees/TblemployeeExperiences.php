<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeExperiences extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_experiences';
    protected $primaryKey = 'exp_emp_id';
    protected $fillable = [
        'exp_emp_id',
        'exp_emp_time',
        'exp_emp_from',
        'exp_emp_to',
        'exp_emp_position',
        'exp_emp_agency',
    ];
    public $timestamps = false;
}
