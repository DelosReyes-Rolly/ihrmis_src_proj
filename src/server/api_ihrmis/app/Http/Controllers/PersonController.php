<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
<<<<<<< HEAD

class PersonController extends Controller
{
    
    public function getPerson(){
=======
use PhpParser\Node\Stmt\TryCatch;

class PersonController extends Controller
{
    public function getPerson() {
>>>>>>> 2215c9adb1b325f735f0ec810bc4a6a00ae0bf7f
        $qryPerson = Person::get();
        return $qryPerson;
    }

    public function addPerson(Request $request)
    {
<<<<<<< HEAD
        try {
=======
        // try {
>>>>>>> 2215c9adb1b325f735f0ec810bc4a6a00ae0bf7f
            $qryAddPerson = new Person();
            $qryAddPerson->psn_name = $request->psn_name;
            $qryAddPerson->psn_email = $request->psn_email;
            $qryAddPerson->save();
<<<<<<< HEAD
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'May error'
            ], 200);
        }

        return response()->json([
            'message' => 'Successfully Added'
=======
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'message' => 'Failed. Try again later.'
        //     ], 400);
        // }

        return response()->json([
            'message' => 'Successfully Added.'
>>>>>>> 2215c9adb1b325f735f0ec810bc4a6a00ae0bf7f
        ], 200);
    }
}
