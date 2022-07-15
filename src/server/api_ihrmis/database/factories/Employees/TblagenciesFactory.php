<?php

namespace Database\Factories\Employees;
use Illuminate\Database\Eloquent\Factories\Factory;
use \App\Models\Employees\Tblagencies;
use Illuminate\Support\Str;

class TblagenciesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Tblagencies::class;

    private $sector = ['DCO', 'DRO', 'DAA', 'COB', 'NGA', 'GOC', 'LGU', 'SUC', 'PUC', 'NGO', 'PRI', 'OTH'];

    public function definition()
    {
        
        return [
            'agn_name' => $this->faker->company(),
            'agn_acronym' => strtoupper(Str::random(4)),
            'agn_sector' => $this->sector[rand(0,12)],
            'agn_head_name' => $this->faker->name(),
            'agn_head_position' => "Under Secretary",
            'agn_head_email' => $this->faker->unique()->email(),
            'agn_address' => $this->faker->address(),
        ];
    }
}
