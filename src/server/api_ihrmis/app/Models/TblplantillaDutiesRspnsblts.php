<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblplantillaDutiesRspnsblts extends Model
{
    use HasFactory;

    protected $table = 'tblplantilla_duties_rspnsblts';

    protected $primaryKey = 'dty_itm_id';
    protected $fillable = [
        'dty_itm_order',
        'dty_itm_desc',
        'dty_itm_percent',
        'dty_itm_cmptncy'
    ];

    public function tblplantillaItems(){
        return $this->belongsTo(TblplantillaItems::class, 'dty_itm_id', 'itm_id');
    }
}
