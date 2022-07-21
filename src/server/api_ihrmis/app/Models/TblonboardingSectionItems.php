<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblonboardingSectionItems extends Model
{
    use HasFactory;


    protected $table = 'tblonboarding_section_items';
    protected $primaryKey = 'itm_onb_id';
    
    protected $fillable=[
        'itm_onb_id',
        'itm_sec_onb_id', 
        'itm_onb_order',
        'itm_onb_name',
        'itm_onb_url',
        'itm_onb_content'
    ];

    public $timestamps = false;
}
