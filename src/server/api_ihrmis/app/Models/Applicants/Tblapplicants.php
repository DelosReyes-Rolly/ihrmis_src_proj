<?php

namespace App\Models\Applicants;

use App\Models\Employee\Tblemployees;
use App\Models\TblplantillaItems;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblapplicants extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants';
    protected $primaryKey = 'app_id';
    protected $fillable = [
        'app_id',
        'app_itm_id',
        'app_emp_id',
        'app_sts_time',
        'app_appntmnt',
        'app_assmptn' 
    ];

    public $timestamps = false;

    public function plantillaItems(){
        return $this->hasOne(TblplantillaItems::class, 'itm_id', 'app_itm_id');
    }
    public function employee(){
        return $this->hasOne(Tblemployees::class, 'emp_id', 'app_emp_id');
    }

}
