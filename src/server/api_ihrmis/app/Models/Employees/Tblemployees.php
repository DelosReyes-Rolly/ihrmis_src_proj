<?php

namespace App\Models\Employees;

use Database\Factories\TblagenciesFactory;
use App\Models\Employees\TblemployeeProfile;
use App\Models\TblplantillaItems;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblemployees extends Model
{
    use HasFactory;

    protected $table = 'tblemployees';
    protected $primaryKey = 'emp_id';
    protected $fillable = [
        'emp_no',
        'emp_nm_last',
        'emp_nm_first',
        'emp_nm_mid',
        'emp_nm_extn',
        'emp_title',
        'emp_ofc_email',
        'emp_itm_id',
        'emp_appntmnt_start',
        'emp_appntmnt_end'
    ];

    public $timestamps = false;

    public function children(){
        return $this->hasMany(TblemployeeChildren::class, 'chi_emp_id' ,'emp_id');
    }

    public function family(){
        return $this->hasOne(TblemployeeFamily::class, "emp_id", "emp_id");
    }

    public function profile(){
        return $this->hasOne(TblemployeeProfile::class, 'emp_id' ,'emp_id');
    }

    public function plantilla(){
        return $this->hasOne(TblplantillaItems::class, 'itm_id' ,'emp_itm_id');
    }

    public function serviceHistory(){
        return $this->hasOne(TblemployeeServiceHistory::class, 'svc_emp_id' ,'emp_id');
    }
}
