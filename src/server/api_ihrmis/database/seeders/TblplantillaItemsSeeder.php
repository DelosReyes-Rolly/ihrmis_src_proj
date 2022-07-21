<?php

namespace Database\Seeders;

use App\Models\TblplantillaItems;
use Illuminate\Database\Seeder;

class TblplantillaItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TblplantillaItems::factory()->count(50)->create(); 
    }
}
