<?php

namespace Database\Seeders;

use App\Models\TblcalendarEventTypes;
use Illuminate\Database\Seeder;

class TblcalendarEventTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TblcalendarEventTypes::factory()->count(14)->create();
    }
}
