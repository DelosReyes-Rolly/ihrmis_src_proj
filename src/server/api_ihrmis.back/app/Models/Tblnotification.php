<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblnotification extends Model
{
    use HasFactory;

    protected $table = 'tblnotification';
    protected $primaryKey = 'noti_id';
    
    protected $fillable=[
        'noti_title',
        'noti_message',
        'noti_read',

    ];

    // public $timestamps = false;

}
