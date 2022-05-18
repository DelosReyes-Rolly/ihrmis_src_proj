<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\Employee\GetEmployeeResource;
use App\Models\Employees\Tblemployees;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function getAllEmployee(){
        $empQry = Tblemployees::with(["plantilla" => function($q){
            $q->with("tbloffices");
        }, "serviceHistory"])->get();     
        return GetEmployeeResource::collection($empQry);
    }
}
