<?php

namespace App\Http\Controllers;

use App\Models\MfoTable;
use Illuminate\Http\Request;

class MfoTableController extends Controller
{
    public function getMfoTable() {
        $qryMfoTable = MfoTable::get();
        return $qryMfoTable;
    }
}
