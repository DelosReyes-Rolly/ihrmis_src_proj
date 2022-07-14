<?php

namespace Database\Factories;

use App\Models\Tbloffices;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class TblofficesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Tbloffices::class;
    private $area_type = ['R', 'P', 'D', 'M', 'F'];

    public function definition()
    {
        return [
            'ofc_type' => rand(1,12),
            'ofc_name' => strtoupper($this->faker->unique()->lexify('DOST OFFICE - ????? ??????')),
            'ofc_acronym' => strtoupper($this->faker->unique()->lexify('DO-??')),
            'ofc_agn_id' => rand(7,9), //-->Change 
            'ofc_area_code' => $this->faker->randomNumber(3, true),
            'ofc_area_type' => $this->faker->randomElement($this->area_type),
            'ofc_email_addr' => $this->faker->unique()->companyEmail()
        ];
    }
}
