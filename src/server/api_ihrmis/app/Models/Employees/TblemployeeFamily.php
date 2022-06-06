<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeFamily extends Model
{
    use HasFactory;
    protected $table = 'tblemployee_family';
    protected $primaryKey = 'emp_id';
    protected $fillable = [
        'emp_id', 
        'emp_sps_nm_last',
        'emp_sps_nm_first',
        'emp_sps_nm_mid',
        'emp_sps_nm_extn',
        'emp_sps_occupation',
        'emp_sps_bus_name',
        'emp_sps_bus_addr',
        'emp_sps_tel_no',

        'emp_fthr_nm_last',
        'emp_fthr_nm_first',
        'emp_fthr_nm_mid',
        'emp_fthr_nm_extn',

        'emp_mthr_nm_last',
        'emp_mthr_nm_first',
        'emp_mthr_nm_mid',
        'emp_mthr_nm_extn',
    ];

    public $timestamps = false;
}
