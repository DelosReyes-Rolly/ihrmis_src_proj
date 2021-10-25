<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TbljvsCompetencyRatings extends Model
{
    use HasFactory;

    protected $table = 'tbljvs_cmptncy_ratings';
    protected $primary = 'rtg_id';
    protected $fillable =[
        'rtg_id',
        'rtg_com_type',
        'rtg_seq_order',
        'rtg_factor',
        'rtg_percent'
    ];

    public $timestamps = false;
    
    public function tbljvsComType()
    {
        return $this->belongsTo(TbljvsCompetencies::class, 'com_type', 'rtg_com_type');
    }

    public function tbljvsComJvsId()
    {
        return $this->belongsTo(TbljvsCompetencies::class, 'com_jvs_id', 'rtg_id');
    }
}
