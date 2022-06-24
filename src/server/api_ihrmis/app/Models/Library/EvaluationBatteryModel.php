<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluationBatteryModel extends Model
{
    use HasFactory;

    protected $table = 'tblevaluation_batteries';
    protected $primaryKey = 'bat_id';

    protected $fillable = [
        'bat_name',
        'bat_points',
        'bat_grp_id',
        'bat_itm_order',
        'bat_sg_type',
    ];

    public $timestamps = false;

    public function Category()
    {
        return $this->hasOne(CategoryGroupModel::class, 'grp_id', 'bat_grp_id');
    }
}
