<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblemployees extends Model
{
    use HasFactory;
    protected $table = 'tblemployees';
    protected $primaryKey = 'emp_id ';
    protected $fillable = [
        'emp_id ',
        'emp_no',
        'emp_nm_last',
        'emp_nm_first',
        'emp_nm_extn',
        'emp_title' ,
        'emp_ofc_email',
        'emp_ofc_email',
        'emp_appntmnt_start',
        'emp_appntmnt_end'
    ];

    public $timestamps = false;
}
