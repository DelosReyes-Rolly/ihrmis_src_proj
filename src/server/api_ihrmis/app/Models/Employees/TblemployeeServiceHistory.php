<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeServiceHistory extends Model
{
    use HasFactory;
    protected $table = 'tblemployee_service_history';
    protected $primaryKey = 'svc_emp_id';
    protected $fillable = [
        'svc_emp_id',
        'svc_date ',
        'svc_act_id',
        'svc_itm_id',
        'svc_status',
        'svc_salary',
        'svc_remarks',
    ];

    public $timestamps = false;
}
