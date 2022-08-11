<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblcalendarEvent extends Model
{
    use HasFactory;
    protected $table = 'tblcalendar_event';
    protected $primaryKey = 'evn_id';

    protected $fillable = [
        'evn_id ',
        'evn_source',
        'evn_typ_id',
        'evn_name',
        'evn_url',
        'evn_date_start',
        'evn_date_end',
        'evn_time_start',	
        'evn_time_end',
        'evn_frequency',
        'evn_interval',
        'evn_month',
        'evn_week',
        'evn_day',
        'evn_weekday',
        'evn_remarks',
        'evn_system',
        'evn_is_done'
    ];

    public $timestamps = false;

}
