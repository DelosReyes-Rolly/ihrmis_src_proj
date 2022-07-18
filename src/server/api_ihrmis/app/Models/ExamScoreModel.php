<?php

namespace App\Models;

use App\Models\Library\EvaluationBatteryModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamScoreModel extends Model
{
    use HasFactory;
    protected $table = 'tblapplicant_exam_score';
    protected $primaryKey = 'exam_score_id';

    protected $fillable = [
        'exam_app_id',
        'exam_battery_id',
        'exam_score'
    ];

    public $timestamps = false;

    public function BatteryData() {
        return $this->hasOne(EvaluationBatteryModel::class, 'bat_id' ,'exam_battery_id');
    }
}
