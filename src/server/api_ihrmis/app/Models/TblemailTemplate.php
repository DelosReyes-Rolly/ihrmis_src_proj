<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemailTemplate extends Model
{
    use HasFactory;

    protected $table = 'tblemail_templates';
    protected $primaryKey = 'eml_id';
    
    protected $fillable=[
        'eml_type',
        'eml_link',
        'eml_name',
        'eml_message',
    ];

    public $timestamps = false;
}
