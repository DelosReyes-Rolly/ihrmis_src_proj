<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MfoTable extends Model
{
    use HasFactory;

    protected $table = 'tblmfo_tables';
    protected $primaryKey = 'mfo_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'mfo_ofc_id',
        'mfo_year',
        'mfo_sts_time',
    ];
}
