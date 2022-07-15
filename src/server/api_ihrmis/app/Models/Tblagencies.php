<?php

namespace App\Models;

use Database\Factories\TblagenciesFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblagencies extends Model
{
    use HasFactory;
    protected $table = 'tblagencies';
    protected $primaryKey = 'agn_id';

    protected $fillable = [
        'agn_id',
        'agn_name',
        'agn_acronym',
        'agn_sector', 
        'agn_head_name',
        'agn_head_position',
        'agn_head_email',
        'agn_address' 
    ];

    public $timestamps = false;
}
