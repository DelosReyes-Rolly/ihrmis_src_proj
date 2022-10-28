<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MfoTableStatus extends Model
{
    use HasFactory;

    protected $table = 'tblmfo_table_status';
    protected $primaryKey = 'sts_mfo_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'sts_mfo_time',
        'sts_mfo_stg_id',
        'sts_mfo_remarks',
    ];
}
