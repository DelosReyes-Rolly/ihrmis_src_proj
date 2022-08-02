<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblonboardingSections extends Model
{
    use HasFactory;

    protected $table = 'tblonboarding_sections';
    protected $primaryKey = 'sec_onb_id';
    
    protected $fillable=[
        'sec_onb_id',
        'sec_onb_order',
        'sec_onb_name'
    ];
    public $timestamps = false;

    public function sectionitem()
    {
        return $this->hasMany(TblonboardingSectionItems::class, "itm_sec_onb_id" , "sec_onb_id")->orderBy('itm_onb_order');
    }
}
