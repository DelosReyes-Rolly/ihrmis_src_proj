<?php

namespace Database\Factories;

use App\Models\TblplantillaItems;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class TblplantillaItemsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = TblplantillaItems::class;
    public function definition(){
        $dateYear = Carbon::now();
        return [
            'itm_regular' => rand(0,1),
            'itm_no' => strtoupper($this->faker->unique()->lexify("????-")).$dateYear->subYear(rand(1,10))->format('Y-m-d').strtoupper($this->faker->unique()->lexify("-???")),
            'itm_pos_id' => rand(1,32),
            'itm_ofc_id' => rand(1,9),
            'itm_status' => rand(0,7),
            'itm_basis' => rand(0,1),
            'itm_category' => rand(0,1),
            'itm_level' => rand(0,3),
            'itm_function' => $this->faker->sentence(3),
            'itm_creation' => rand(0,1),
            'itm_source' => rand(0,2),
            'itm_supv1_itm_id' => 0,
            'itm_supv2_itm_id' => 0,
            'itm_state' => rand(0,5),
        ];
    }
}
