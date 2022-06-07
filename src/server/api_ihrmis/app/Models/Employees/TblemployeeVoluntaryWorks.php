<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeVoluntaryWorks extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_voluntary_works';
    protected $primaryKey = 'vol_id';
    protected $fillable = [
        "vol_id",
        "vol_emp_id",
        "vol_emp_org",
        "vol_emp_addr",
        "vol_emp_from",
        "vol_emp_to",
        "vol_emp_hours",
        "vol_emp_work",
    ];
    public $timestamps = false;
}
