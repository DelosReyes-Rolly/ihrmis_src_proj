<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TbljvsDutiesRspnsblts extends Model
{
    use HasFactory;

    protected $table = 'tbljvs_duties_responsibilities';
    protected $primaryKey = 'dty_jvs_id';

    protected $fillable=[
        'dty_jvs_id',
        'dty_jvs_order',
        'dty_jvs_desc'
    ];

    public $timestamps = false;
    
    public function tbljvs()
    {
        return $this->belongsTo(Tbljvs::class, 'jvs_id', 'dty_jvs_id');
    }


}
