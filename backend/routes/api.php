<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('employees')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']); // Displays all employees
    Route::get('/{employee}', [EmployeeController::class, 'show']); // Display employee details
    Route::post('/', [EmployeeController::class, 'store']); // Save the new employee
    Route::put('/{employee}', [EmployeeController::class, 'update']); // Update employee data
    Route::delete('/{employee}', [EmployeeController::class, 'destroy']); // Delete employee
});
