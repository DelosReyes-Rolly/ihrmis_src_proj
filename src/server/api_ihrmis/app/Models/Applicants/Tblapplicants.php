<?php

namespace App\Models\Applicants;

use App\Models\Tbloffices;
use App\Models\TblplantillaItems;
use App\Models\Tblpositions;
use App\Models\Employee\Tblemployees;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblapplicants extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants';
    protected $primaryKey = 'app_id';
    protected $fillable = [
        'app_id',
        'app_itm_id',
        'app_emp_id',
        'app_sts_time',
        'app_appntmnt',
        'app_assmptn'
    ];

    public $timestamps = false;

    public function tblapplicantChildren()
    {
        return $this->hasMany(TblapplicantChildren::class, 'chi_app_id', 'app_id');
    }
    public function tblapplicantEligibility()
    {
        return $this->hasMany(TblapplicantCseligibilities::class, 'cse_app_id', 'app_id');
    }

    public function tblapplicantEducation()
    {
        return $this->hasMany(TblapplicantEducations::class, 'edu_app_id', 'app_id');
    }

    public function tblapplicantExperience()
    {
        return $this->hasMany(TblapplicantExperiences::class, 'exp_app_id', 'app_id');
    }
    public function tblapplicantTrainings()
    {
        return $this->hasMany(TblapplicantTrainings::class, 'trn_app_id', 'app_id');
    }

    public function tblapplicantsStatus()
    {
        return $this->hasMany(TblapplicantsStatus::class, 'sts_app_id', 'app_id');
    }

    public function TblapplicantsProfile()
    {
        return $this->hasOne(TblapplicantsProfile::class, 'app_id', 'app_id');
    }

    public function TblplantillaItems()
    {
        return $this->hasOne(TblplantillaItems::class, 'itm_id', 'app_itm_id');
    }

    public function TblPositions()
    {
        return $this->hasOneThrough(Tblpositions::class, TblplantillaItems::class, 'itm_id', 'pos_id', 'app_itm_id','itm_pos_id');
    }

    public function TblOffices()
    {
        return $this->hasOneThrough(Tbloffices::class, TblplantillaItems::class, 'itm_id', 'ofc_id', 'app_itm_id','itm_ofc_id');
    }

    public function plantillaItems()
    {
        return $this->hasOne(TblplantillaItems::class, 'itm_id', 'app_itm_id');
    }

    public function employee()
    {
        return $this->hasOne(Tblemployees::class, 'emp_id', 'app_emp_id');
    }

    public function applicant(){
        return $this->hasOne(TblapplicantsProfile::class, 'app_id' ,'app_id');
    }
    

}
