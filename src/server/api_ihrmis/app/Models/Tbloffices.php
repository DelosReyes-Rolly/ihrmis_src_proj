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
        'ofc_type',
        'ofc_name',
        'ofc_acronym',
        'ofc_area_code',
        'ofc_area_type',
        'ofc_head_itm_id',
        'ofc_oic_itm_id',
        'ofc_ofc_id',
    ];

    public $timestamps = false;

    public function tblplantillaItems(){
        return $this->belongsTo(TblplantillaItems::class);
    }
}
