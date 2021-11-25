<?php

use App\Http\Controllers\PdfEmailGeneratorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/send-email', function () {
    dd(env('FRONTEND_APPLICANT_REDIRECT_URL') . "3");
});

Route::get('/send-email-pdf', [PdfEmailGeneratorController::class, 'index']);