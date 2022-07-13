<?php

namespace Database\Seeders;
require_once 'vendor/autoload.php';

use \App\Models\Employees\Tblagencies;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class TblagenciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        Tblagencies::factory()->count(3)->create(); 
    }
}
