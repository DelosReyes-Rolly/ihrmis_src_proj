<?php

use App\Http\Controllers\JvscrwMainController;
use App\Http\Controllers\TblofficesController;
use App\Http\Controllers\TblplantillaItemsController;
use App\Http\Controllers\TblpositionsController;
use App\Http\Resources\Plantilla\JvscrwResource;
use App\Models\TblplantillaItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// Route::get('plantilla-items/jobvacancy', [TblplantillaItemsController::class, 'jobvacancy']);
Route::resource('plantilla-items', TblplantillaItemsController::class);

Route::get('jvscrw/{id}', [JvscrwMainController::class, "show"]);
// Route::resource('jvscrw/{id}', JvscrwMainController::class);


Route::resource('offices', TblofficesController::class);
Route::resource('positions', TblpositionsController::class);
Route::resource('positions-csc-std', TblpositionsController::class);

// Route::get('/plantilla-items', function(){
//     return TblplantillaItems::all();
// });
