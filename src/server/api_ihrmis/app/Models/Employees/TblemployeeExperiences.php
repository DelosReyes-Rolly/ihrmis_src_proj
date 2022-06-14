<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeExperiences extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_experiences';
    protected $primaryKey = 'exp_id';
    protected $fillable = [
        'exp_id',
        'exp_emp_id',
        'exp_emp_from',
        'exp_emp_to',
        'exp_emp_position',
        'exp_emp_agency',
        'exp_emp_salary',
        'exp_emp_grade',
        'exp_emp_step',
        'exp_emp_appntmnt',
        'exp_emp_govt',
        'exp_emp_rel_fields'
    ];
    public $timestamps = false;
}
