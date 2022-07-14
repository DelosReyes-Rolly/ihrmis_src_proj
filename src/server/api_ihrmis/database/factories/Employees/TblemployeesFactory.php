<?php

namespace Database\Factories\Employees;
use App\Models\Employees\Tblemployees;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;

class TblemployeesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Tblemployees::class;
   

    public function definition()
    {
        return [
            "emp_no" => "DOST-". strtoupper(Str::random(5))."-2019",
            "emp_nm_last" => $this->faker->lastName(),
            "emp_nm_first" => $this->faker->firstName(),
            "emp_nm_mid" => strtoupper($this->faker->randomLetter()),
            "emp_nm_extn" => $this->faker->suffix(),
            "emp_title" => $this->faker->title(),
            "emp_ofc_email" => $this->faker->unique()->companyEmail(),
            "emp_itm_id" => $this->faker->unique()->randomDigitNotNull(),
            "emp_appntmnt_start" => $this->faker->dateTimeBetween('-5 years', '-3 years'),
            "emp_appntmnt_end" => null,
        ];

        
    }
}
