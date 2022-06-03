<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryGroupModel extends Model
{
    use HasFactory;

    protected $table = 'tblcategory_groups';
    protected $primaryKey = 'grp_id';

    protected $fillable = [
        'grp_name',
        'grp_level',
        'grp_cluster',
    ];
    
    public $timestamps = false;
}
