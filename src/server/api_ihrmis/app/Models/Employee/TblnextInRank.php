<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblnextInRank extends Model
{
    use HasFactory;

    protected $table = 'tblnext_in_rank';
    protected $primaryKey = 'nir_id ';
    protected $fillable = [
        'nir_emp_id ',
        'nir_ofc_id',
        'nir_itm_id',
        'nir_agn_id',
        'nir_name',
        'nir_office',
        'nir_pos_title',
        'nir_email' ,
    ];

    public $timestamps = false;

}
