<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblattachments extends Model
{
    use HasFactory;

    protected $table = 'tblattachments';
    protected $primaryKey = 'att_id ';

    protected $fillable = [
        'att_id',
        'att_source',
        'att_name',
        'att_file',
    ];

    public $timestamps = false;
}
