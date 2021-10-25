<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblpositionCscStandards extends Model
{
    use HasFactory;

    protected $primaryKey = 'std_pos_id';
    protected $fillable=[
        'std_type',
        'std_quantity',
        'std_keyword',
        'std_specifics',
    ];

    public $timestamps=false;

    public function tblpositions()
    {
        return $this->belongsTo(Tblpositions::class);
    }
}
