<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TbljvsCompetencies extends Model
{
    use HasFactory;

    protected $table = 'tbljvs_competencies';
    protected $primaryKey = 'com_jvs_id';

    protected $fillable = [
        'com_jvs_id',
        'com_type',
        'com_specific'
    ];

    public $timestamps = false;

    public function tbljsv()
    {
        return $this->belongsTo(Tbljvs::class, 'jvs_id', 'com_jvs_id');
    }

    public function tblComType()
    {
        return $this->hasMany(TbljvsCompetencyRatings::class, 'rtg_com_type', 'com_type');
    }

    public function tblComJvsId()
    {
        return $this->hasMany(TbljvsCompetencyRatings::class, 'rtg_id', 'com_jvs_id');
    }

    
}
