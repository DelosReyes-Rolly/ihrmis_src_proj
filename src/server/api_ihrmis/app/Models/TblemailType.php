<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemailType extends Model
{
    use HasFactory;

    protected $primaryKey = 'mail_id';
    protected $table = 'tblmail_type';
    
    protected $fillable=[
        'mail_id',
        'mail_title',
        'mail_message',
    ];

    public $timestamps = false;
}
