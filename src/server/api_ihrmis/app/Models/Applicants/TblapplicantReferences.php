<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantReferences extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_references';
    protected $primary = 'ref_app_id';
    protected $fillable = [
        'ref_app_id',
        'ref_app_time',
        'ref_app_name',
        'ref_app_adr',
        'ref_app_tel_no',
    ];
    
    public $timestamps = false;
}
