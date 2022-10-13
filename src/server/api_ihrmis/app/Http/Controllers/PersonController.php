<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    
    public function getPerson(){
        $qryPerson = Person::get();
        return $qryPerson;
    }

    public function addPerson(Request $request)
    {
        try {
            $qryAddPerson = new Person();
            $qryAddPerson->psn_name = $request->psn_name;
            $qryAddPerson->psn_email = $request->psn_email;
            $qryAddPerson->save();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'May error'
            ], 200);
        }

        return response()->json([
            'message' => 'Successfully Added'
        ], 200);
    }
}
