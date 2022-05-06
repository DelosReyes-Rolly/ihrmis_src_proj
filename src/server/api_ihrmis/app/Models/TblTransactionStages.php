<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblTransactionStages extends Model
{
    use HasFactory;

    protected $table = 'tbltransaction_stages';
    protected $primaryKey = 'stg_id';

    protected $fillable = [
        'stg_desc',
        'stg_order',
        'stg_cluster',
        'stg_group', 
    ];

    public $timestamps = false;
}
