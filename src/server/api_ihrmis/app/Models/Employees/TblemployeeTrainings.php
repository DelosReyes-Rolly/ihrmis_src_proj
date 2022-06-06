<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeTrainings extends Model
{
    use HasFactory;
    protected $table = 'tblemployee_trainings';
    protected $primaryKey = 'trn_id';
    protected $fillable = [
        'trn_id',
        'trn_emp_id',
        'trn_emp_title ',
        'trn_emp_from',
        'trn_emp_to ',
        'trn_emp_hours',
        'trn_emp_type',
        'trn_emp_sponsor',
        'trn_emp_cmptncy',
    ];

    public $timestamps = false;
}
