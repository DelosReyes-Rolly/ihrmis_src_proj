<?php

namespace App\Models\Second;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecApplicantVerification extends Model
{
    use HasFactory;

    public $connection="mysql2";
    protected $table = 'sec_applicant_verification';
    protected $primary = 'id_sec_applicant';
    protected $fillable = [
        'id_sec_applicant',
        'token'
    ];

    public $timestamps = false;

}
