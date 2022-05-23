<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantsStatus extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_status';
    protected $primaryKey = 'sts_app_id';

    protected $fillable = [
        'sts_app_time',
        'sts_app_stg_id',
        'sts_app_complete',
        'sts_app_remarks', 
    ];

    public $timestamps = false;
}
