<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbloffices extends Model
{
    use HasFactory;
    protected $table = 'tbloffices';
    protected $primaryKey = 'ofc_id';
    
    protected $fillable=[
        'ofc_id',
        'ofc_type',
        'ofc_name',
        'ofc_acronym',
        'ofc_agn_id',
        'ofc_area_code',
        'ofc_area_type',
        'ofc_head_itm_id',
        'ofc_oic_itm_id',
        'ofc_ofc_id',
    ];

    public $timestamps = false;

    public function plantillaItems(){
        return $this->hasMany(TblplantillaItems::class, 'itm_ofc_id', 'ofc_id');
    }

    public function officeAgency() {
        return $this->hasOne(Tblagencies::class, 'agn_id', 'ofc_agn_id');
    }

    // public function plantillaItems(){
    //     return $this->hasMany(TblplantillaItems::class, 'itm_ofc_id', 'ofc_id');
    // }
}
