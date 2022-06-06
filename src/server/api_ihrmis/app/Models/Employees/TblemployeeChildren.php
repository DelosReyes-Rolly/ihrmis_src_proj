<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblemployeeChildren extends Model
{
    use HasFactory;

    protected $table = 'tblemployee_children';
    protected $primaryKey = 'chi_emp_id';
    protected $fillable = [
        'chi_emp_id',
        'chi_emp_name',
        'chi_emp_birthdate',
    ];

    public $timestamps = false;
    
    public function tblapplicant()
    {
        return $this->belongsTo(TblEmployees::class, 'emp_id', 'chi_emp_id');
    }
}
