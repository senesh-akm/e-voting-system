<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ConstituencyController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\PartyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// User Authentication Module
Route::post('/register', [AuthController::class, 'register']);
Route::put('/update/{id}', [AuthController::class, 'update']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Party Module
Route::get('/parties', [PartyController::class, 'index']);
Route::post('/parties', [PartyController::class, 'store']);
Route::get('/parties/{id}', [PartyController::class, 'find']);
Route::put('/parties/{id}', [PartyController::class, 'update']);

// District Module
Route::get('/districts', [DistrictController::class, 'index']);
Route::post('/districts', [DistrictController::class, 'store']);

// Constituency Module
Route::get('/constituencies', [ConstituencyController::class, 'index']);
Route::post('/constituencies', [ConstituencyController::class, 'store']);

// Election Module
Route::get('/elections', [ElectionController::class, 'index']);
Route::post('/elections', [ElectionController::class, 'store']);
Route::put('/elections/{id}', [ElectionController::class, 'update']);

// Candidate Module
Route::get('/elections/{election_id}/candidates', [CandidateController::class, 'index']);
Route::get('/candidates', [CandidateController::class, 'all']);
Route::post('/candidates', [CandidateController::class, 'store']);
Route::put('/candidates/{id}', [CandidateController::class, 'update']);
Route::delete('/candidates/{id}', [CandidateController::class, 'destroy']);
