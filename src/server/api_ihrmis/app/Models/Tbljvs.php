<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbljvs extends Model
{
    use HasFactory;

    protected $primaryKey = 'jvs_id';
    protected $table = 'tbljvs';
    
    protected $fillable=[
        'jvs_itm_id',
        'jvs_version',
        'jvs_min_com_desc',
        'jvs_prepared',
        'jvs_approved',
        'jvs_signed'
    ];

    public $timestamps = false;

    public function tbljvs()
    {
        return $this->hasOne(TblplantillaItems::class, 'itm_id', 'jvs_itm_id');
    }
    
    public function tbljvsDutiesResponsibilty()
    {
        return $this->hasMany(TbljvsDutiesRspnsblts::class, 'dty_jvs_id' ,'jvs_id');
    }

}
