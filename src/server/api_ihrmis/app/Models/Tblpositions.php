<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblpositions extends Model
{
    use HasFactory;
    protected $table = 'tblpositions';
    protected $primaryKey = 'pos_id';

    protected $fillable = [
        'pos_title',
        'pos_short_name',
        'pos_salary_grade',
        'pos_category', 
    ];

    public $timestamps = false;

    public function tblpositionCscStandards()
    {
        return $this->hasMany(TblpositionCscStandards::class, 'std_pos_id', 'pos_id');
    }

    public function tblplantillaItems(){
        return $this->belongsToMany(TblplantillaItems::class);
    }

}
