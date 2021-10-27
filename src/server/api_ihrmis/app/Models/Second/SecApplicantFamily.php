<?php

namespace App\Models\Second;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecApplicantFamily extends Model
{
    use HasFactory;

    public $connection="mysql2";
    protected $table = 'sec_applicants_family';
    protected $primaryKey = 'app_id';
    protected $fillable = [
        'app_id', 
        'app_sps_nm_last',
        'app_sps_nm_first',
        'app_sps_nm_mid',
        'app_sps_nm_extn',
        'app_sps_occupation',
        'app_sps_bus_name',
        'app_sps_bus_addr',
        'app_sps_tel_no',

        'app_fthr_nm_last',
        'app_fthr_nm_first',
        'app_fthr_nm_mid',
        'app_fthr_nm_extn',

        'app_mthr_nm_last',
        'app_mthr_nm_first',
        'app_mthr_nm_mid',
        'app_mthr_nm_extn',
    ];
    public $timestamps = false;
}
