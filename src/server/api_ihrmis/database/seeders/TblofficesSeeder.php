<?php

namespace Database\Seeders;

use App\Models\Tbloffices;
use Illuminate\Database\Seeder;

class TblofficesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tbloffices::factory()->count(9)->create(); 
    }
}
