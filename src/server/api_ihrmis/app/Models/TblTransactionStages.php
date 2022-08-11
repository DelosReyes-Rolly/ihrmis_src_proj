<?php

namespace App\Models;

use App\Models\Library\CategoryGroupModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblTransactionStages extends Model
{
    use HasFactory;

    protected $table = 'tbltransaction_stages';
    protected $primaryKey = 'stg_id';

    protected $fillable = [
        'stg_desc',
        'stg_order',
        'stg_group', 
    ];

    public $timestamps = false;

    public function Category()
    {
        return $this->hasOne(CategoryGroupModel::class, 'grp_id', 'stg_group');
    }
}
