<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevPlanPeriods extends Model
{
    use HasFactory;

    protected $table = 'tbldev_plan_periods';
    protected $primaryKey = 'prd_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'prd_start',
        'prd_end',
        'prd_title',
    ];

    public $timestamps = false;
}
