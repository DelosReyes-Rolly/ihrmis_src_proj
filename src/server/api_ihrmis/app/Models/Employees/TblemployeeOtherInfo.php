<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeOtherInfo extends Model
{
    use HasFactory;
    protected $table = 'tblemployees_other_info';
    protected $primaryKey = 'oth_id';
    protected $fillable = [
        'oth_id',
        'oth_emp_id',
        'oth_emp_type',
        'oth_emp_desc',
    ];

    public $timestamps = false;
    
}
