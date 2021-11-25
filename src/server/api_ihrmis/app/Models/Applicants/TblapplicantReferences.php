<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantReferences extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_references';
    protected $primaryKey = 'ref_app_id';
    protected $fillable = [
        'ref_app_id',
        'ref_app_name',
        'ref_app_addr',
        'ref_app_tel_no',
        'ref_app_email'
    ];
    
    public $timestamps = false;
}
