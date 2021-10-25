<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantTrainings extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_trainings';
    protected $primary = 'trn_app_id';
    protected $fillable = [
        'trn_app_id',
        'trn_app_time',
        'trn_app_title',
        'trn_app_from',
        'trn_app_to',
        'trn_app_hours',
        'trn_app_type',
        'trn_app_sponsors',
    ];
    
    public $timestamps = false;
}
