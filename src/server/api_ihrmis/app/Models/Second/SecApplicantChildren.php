<?php

namespace App\Models\Second;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecApplicantChildren extends Model
{
    use HasFactory;
    public $connection="mysql2";
    protected $table = 'sec_applicants_children';
    protected $primaryKey = 'chi_app_id';
    protected $fillable = [
        'chi_app_id',
        'chi_app_name',
        'chi_app_birthdate',
    ];
    public $timestamps = false;
}

