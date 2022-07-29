<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(){
        $this->call(TblagenciesSeeder::class);
        $this->call(TblofficesSeeder::class);
        $this->call(TblemployeesSeeder::class);
        $this->call(TblpositionsSeeder::class);
        $this->call(TblplantillaItemsSeeder::class);
        $this->call(TblcalendarEventTypesSeeder::class);
    }
}
