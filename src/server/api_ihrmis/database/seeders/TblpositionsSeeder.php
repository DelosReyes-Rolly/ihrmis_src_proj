<?php

namespace Database\Seeders;

use App\Models\Tblpositions;
use Illuminate\Database\Seeder;

class TblpositionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tblpositions::factory()->count(33)->create(); 
    }
}
