<?php

namespace Database\Factories;

use App\Models\Tblpositions;
use Illuminate\Database\Eloquent\Factories\Factory;

class TblpositionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Tblpositions::class;
    
    private $category = ['CE', 'PS', 'PN', 'SS', 'SN'];
    
    public function definition()
    {
        $pos = $this->faker->unique()->randomElement($this->position);
        
        return [
            'pos_title' => $pos['title'],
            'pos_short_name' => $pos['short'],
            'pos_salary_grade' => $pos['sg'],
            'pos_category' => $this->faker->randomElement($this->category),
        ];
    }

    private $position = [
        [ 
            "title" => 'Utility Worker I',
            "short" => 'UWR-I',
            "sg" => 1,
        ],
        [ 
            "title" => 'Messenger',
            "short" => 'MSG',
            "sg" => 2,
        ],
        [ 
            "title" => 'Clerk I',
            "short" => 'CLK-I',
            "sg" => 3,
        ],
        [ 
            "title" => 'Driver II',
            "short" => 'DRI-II',
            "sg" => 4,
        ],
        [ 
            "title" => 'Lab Technician I',
            "short" => 'LTECH-I',
            "sg" => 5,
        ],
        [ 
            "title" => 'Computer Operator I',
            "short" => 'COP-I',
            "sg" => 6,
        ],
        [ 
            "title" => 'Assistant Engineer',
            "short" => 'A-ENGR',
            "sg" => 7,
        ],
        [ 
            "title" => 'Electrician Foreman',
            "short" => 'ELF',
            "sg" => 8,
        ],
        [ 
            "title" => 'Legal Assistant I',
            "short" => 'LGA-I',
            "sg" => 9,
        ],
        [ 
            "title" => 'Teacher I',
            "short" => 'THR-I',
            "sg" => 10,
        ],
        [ 
            "title" => 'Teacher II',
            "short" => 'THR-II',
            "sg" => 11,
        ],
        [ 
            "title" => 'Teacher III',
            "short" => 'THR-III',
            "sg" => 12,
        ],
        [ 
            "title" => 'Cashier II',
            "short" => 'CSH-II',
            "sg" => 13,
        ],
        [ 
            "title" => 'Electrician Foreman',
            "short" => 'ELF',
            "sg" => 14,
        ],
        [ 
            "title" => 'Budget Officer II',
            "short" => 'BOFF-II',
            "sg" => 15,
        ],
        [ 
            "title" => 'Attorney I',
            "short" => 'ATT-I',
            "sg" => 16,
        ],

        [ 
            "title" => 'Executive Assistant II',
            "short" => 'EXA-II',
            "sg" => 17,
        ],

        [ 
            "title" => 'Economist III',
            "short" => 'ECO-III',
            "sg" => 18,
        ],

        [ 
            "title" => 'IT Officer I',
            "short" => 'ITO-I',
            "sg" => 19,
        ],

        [ 
            "title" => 'Board Secretary III',
            "short" => 'BSEC-III',
            "sg" => 20,
        ],

        [ 
            "title" => 'Attorney III',
            "short" => 'ATT-III',
            "sg" => 21,
        ],
        
        [ 
            "title" => 'Assistant Div Chief',
            "short" => 'ADC',
            "sg" => 22,
        ],
        [ 
            "title" => 'Court Attorney II',
            "short" => 'CATT-II',
            "sg" => 23,
        ],
        [ 
            "title" => 'Division Chief',
            "short" => 'DIVC',
            "sg" => 24,
        ],
        [ 
            "title" => 'Director I',
            "short" => 'DIR-I',
            "sg" => 25,
        ],
        [ 
            "title" => 'Director II',
            "short" => 'DIR-II',
            "sg" => 26,
        ],
        [ 
            "title" => 'Director III',
            "short" => 'DIR-III',
            "sg" => 27,
        ],
        [ 
            "title" => 'Bureau Director',
            "short" => 'BDIR',
            "sg" => 28,
        ],
        [ 
            "title" => 'Assistant Secretary',
            "short" => 'ASEC',
            "sg" => 29,
        ],
        [ 
            "title" => 'Undersecretary',
            "short" => 'USEC',
            "sg" => 30,
        ],
        [ 
            "title" => 'Secretary',
            "short" => 'SEC',
            "sg" => 31,
        ],
        [ 
            "title" => 'Vice President',
            "short" => 'VPRESS',
            "sg" => 32,
        ],
        [ 
            "title" => 'President',
            "short" => 'PRESS',
            "sg" => 33,
        ],
    ];

}
