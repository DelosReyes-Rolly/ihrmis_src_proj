<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantDeclarations extends Model
{
    use HasFactory;
    protected $table = 'tblapplicants_declarations';
    protected $primaryKey = 'dec_app_id';
    protected $fillable = [
        'dec_app_id',
        'dec_app_question',
        'dec_app_yes',
        'dec_app_details',
        'dec_app_date',
    ];
    
    public $timestamps = false;
}
