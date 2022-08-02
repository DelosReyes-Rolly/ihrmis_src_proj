<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountRequestModel extends Model
{
    use HasFactory;
    protected $table = 'tblaccount_request';
    protected $primaryKey = 'acc_req_id';
    protected $fillable = [
        'acc_req_code',
        'acc_req_last_name',
        'acc_req_first_name',
        'acc_req_middle_name',
        'acc_req_title_id',
        'acc_req_telephone',
        'acc_req_mobile',
        'acc_req_position',
        'acc_req_office',
        'acc_req_email',
        'acc_req_verified',
    ];

    public $timestamps = false;

    public function TblPositions()
    {
        return $this->hasOneThrough(Tblpositions::class, TblplantillaItems::class, 'itm_id', 'pos_id', 'acc_req_position', 'itm_pos_id');
    }

    public function TblOffice(){
        return $this->hasOne(Tbloffices::class,'ofc_id','acc_req_office');
    }
}
