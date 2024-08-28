<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\PartyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// User Authentication Module
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Party Module
Route::get('/parties', [PartyController::class, 'index']);
Route::post('/parties', [PartyController::class, 'store']);

// District Module
Route::get('/districts', [DistrictController::class, 'index']);
Route::post('/districts', [DistrictController::class, 'store']);
