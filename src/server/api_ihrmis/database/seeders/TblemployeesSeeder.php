<?php

namespace Database\Seeders;

use App\Models\Employees\Tblemployees;
use Illuminate\Database\Seeder;

class TblemployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tblemployees::factory()->count(9)->create(); 
    }
}
