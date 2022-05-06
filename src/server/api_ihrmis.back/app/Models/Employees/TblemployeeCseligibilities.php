<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeCseligibilities extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_cseligibilities';
    protected $primaryKey = 'cse_emp_id';
    protected $fillable = [
        'cse_emp_id',
        'cse_emp_time',
        'cse_emp_title',
        'cse_emp_date',
        'cse_emp_place',
        'cse_emp_rating',
        'cse_emp_license',
        'cse_emp_validity',
    ];
    public $timestamps = false;
}
