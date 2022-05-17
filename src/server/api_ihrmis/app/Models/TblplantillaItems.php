<?php

namespace App\Models;

use App\Models\Applicants\Tblapplicants;
use App\Models\Employees\Tblemployees;
use App\Models\Applicants\TblapplicantsProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblplantillaItems extends Model
{
    use HasFactory;

    protected $primaryKey = 'itm_id';
    protected $table = 'tblplantilla_items';
    
    protected $fillable = [
        'itm_regular',
        'itm_no',
        'itm_pos_id',
        'itm_ofc_id',
        'itm_status',
        'itm_basis',
        'itm_category',
        'itm_level',
        'itm_function',
        'itm_creation',
        'itm_source',
        'itm_supv1_itm_id',
        'itm_supv2_itm_id',
        'itm_state',
    ];

    public $timestamps = false;


    public function tblpositions()
    {
        return $this->hasOne(Tblpositions::class, 'pos_id', 'itm_pos_id');
    }

    public function tbljvs()
    {
        return $this->hasMany(Tbljvs::class, 'jvs_itm_id', 'itm_id');
    }

    public function tbldtyresponsibility()
    {
        return $this->hasMany(TblplantillaDutiesRspnsblts::class, 'dty_itm_id', 'itm_id');
    }

    public function Tblapplivants()
    {
        return $this->belongsTo(Tblapplicants::class, 'app_itm_id', 'itm_id');
    }

    public function tblapplicants(){
        return $this->hasMany(Tblapplicants::class, 'app_itm_id' ,'itm_id');
    }

    public function tblapplicant_profile(){
        return $this->hasManyThrough(
            TblapplicantsProfile::class,
            Tblapplicants::class,
            'app_itm_id', // Foreign key on the aplicants table...
            'app_id', // Foreign key on the profile table...
            'itm_id', // Local key on the plnatillaitems table...
            'app_id' // Local key on the applicants table...
        );

    }

    public function employee(){
        return $this->hasOne(Tblemployees::class, 'emp_itm_id', 'itm_id');
    }

    public function tbloffices(){
        return $this->hasOne(Tbloffices::class, 'ofc_id', 'itm_ofc_id');
    }
}
