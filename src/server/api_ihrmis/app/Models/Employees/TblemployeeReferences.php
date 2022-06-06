<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeReferences extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_references';
    protected $primaryKey = 'ref_id';
    protected $fillable = [
        'ref_emp_id',
        'ref_emp_name',
        'ref_emp_email',
        'ref_emp_addr',
        'ref_emp_tel_no',
    ];

    public $timestamps = false;
}
