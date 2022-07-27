<?php

namespace App\Models\Calendar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblcalendarEventTypes extends Model
{
    use HasFactory;
    protected $table = 'tblcalendar_event_types';
    protected $primaryKey = 'typ_evn_id ';

    protected $fillable = [
        'typ_evn_id ',
        'typ_evn_name'
    ];

    public $timestamps = false;
}
