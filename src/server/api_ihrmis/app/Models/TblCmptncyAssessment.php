<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblCmptncyAssessment extends Model
{
    use HasFactory;
    protected $table = 'tblcmptncy_assessment';
    protected $primaryKey = 'com_ass_id';

    protected $fillable = [
        'com_app_id',
        'com_type',
        'com_ass_score',
    ];

    public $timestamps = false;
}
