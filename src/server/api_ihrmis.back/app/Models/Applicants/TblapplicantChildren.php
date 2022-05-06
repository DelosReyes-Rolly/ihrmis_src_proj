<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TblapplicantChildren extends Model
{
    use HasFactory;

    protected $table = 'tblapplicants_children';
    protected $primaryKey = 'chi_app_id';
    protected $fillable = [
        'chi_app_id',
        'chi_app_name',
        'chi_app_birthdate',
    ];
    public $timestamps = false;
    
    public function tblapplicant()
    {
        return $this->belongsTo(Tblapplicants::class, 'app_id', 'chi_app_id');
    }

}
