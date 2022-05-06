<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantVoluntaryWork extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_voluntary_works';
    protected $primaryKey = 'vol_app_id';
    protected $fillable = [
        "vol_app_id",
        "vol_app_time",
        "vol_app_org",
        "vol_app_addr",
        "vol_app_from",
        "vol_app_to",
        "vol_app_hours",
        "vol_app_work",
    ];
    public $timestamps = false;
}
