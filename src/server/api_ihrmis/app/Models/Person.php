<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;
<<<<<<< HEAD

=======
>>>>>>> 2215c9adb1b325f735f0ec810bc4a6a00ae0bf7f
    protected $table = 'person';
    protected $primaryKey = 'psn_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'psn_name',
        'psn_email',
    ];

    public $timestamps = false;
}
