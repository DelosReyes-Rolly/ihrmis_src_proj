<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantVerification extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_verification';
    protected $primary = 'vry_app_id';
    protected $fillable = [
        'vry_app_id',
        'vry_app_token'
    ];

    public $timestamps = false;

}
