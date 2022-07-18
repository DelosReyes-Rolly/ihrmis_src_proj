<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRequirements extends Model
{
    use HasFactory;

    protected $table = 'tbldocumentary_requirements';
    protected $primaryKey = 'doc_id';

    protected $fillable = [
        'doc_name',
        'doc_itm_order',
        'doc_group',
    ];
    
    public $timestamps = false;

    public function Category() {
        return $this->hasOne(CategoryGroupModel::class, 'grp_id', 'doc_group');
    }
}
