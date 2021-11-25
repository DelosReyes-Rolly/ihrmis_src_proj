<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantOtherInfo extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_other_info';
    protected $primaryKey = 'oth_app_id';
    protected $fillable = [
        'oth_app_id',
        'oth_app_time',
        'oth_app_type',
        'oth_app_desc',
    ];
    
    public $timestamps = false;
}
