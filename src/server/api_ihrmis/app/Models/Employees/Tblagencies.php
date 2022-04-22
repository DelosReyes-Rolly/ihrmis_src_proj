<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblagencies extends Model
{
    use HasFactory;

    protected $primaryKey = 'agn_id';
    protected $table = 'tblagencies';
    
    protected $fillable=[
        'agn_name',
        'agn_acronym',
        'agn_sector',
        'agn_head_name',
        'agn_head_position',
        'agn_head_email',
        'agn_address',
    ];

}
