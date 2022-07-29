<?php

namespace Database\Factories;

use App\Models\TblcalendarEventTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

class TblcalendarEventTypesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = TblcalendarEventTypes::class;
    public function definition()
    {
        $types = [
            'Reminder',
            'Appointment',
            'Meeting',
            'Event',
            'Training/Seminar',
            'Orientation/Onboarding',
            'Deadline',
            'Holiday',
            'Birthday',
            'Important',
            'Vacation/Leave',
            'Retirement',
            'Gratuity',
            'Other'
        ];
        
        return [
            'typ_evn_name' => $this->faker->unique()->randomElement($types)
        ];
    }
}
