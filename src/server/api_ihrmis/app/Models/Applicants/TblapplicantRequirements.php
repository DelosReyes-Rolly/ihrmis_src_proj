<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantRequirements extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_requirements';
    protected $primaryKey = 'id';
    protected $fillable = [
        'req_app_id',
        'req_app_doc_id',
        'req_app_file'
    ];

    public $timestamps = false;
}
