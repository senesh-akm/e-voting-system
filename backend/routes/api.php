<?php

use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ConstituencyController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\PartyController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\VoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// User Authentication Module
Route::post('/register', [AuthController::class, 'register']);
Route::put('/update/{id}', [AuthController::class, 'update']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

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
Route::get('/getConstituencies', [ConstituencyController::class, 'getConstituency']);
Route::get('/getConstituenciesByDistrictName', [ConstituencyController::class, 'getConstituenciesByDistrictName']);

// Election Module
Route::get('/elections', [ElectionController::class, 'index']);
Route::post('/elections', [ElectionController::class, 'store']);
Route::put('/elections/{id}', [ElectionController::class, 'update']);
Route::post('/elections/set-active/{id}', [ElectionController::class, 'setActiveElection']);
Route::get('/elections/active', [ElectionController::class, 'getActiveElection']);

// Candidate Module
Route::get('/elections/{election_id}/candidates', [CandidateController::class, 'index']);
Route::get('/candidates', [CandidateController::class, 'all']);
Route::post('/candidates', [CandidateController::class, 'store']);
Route::put('/candidates/{id}', [CandidateController::class, 'update']);
Route::delete('/candidates/{id}', [CandidateController::class, 'destroy']);

// Vote Module
Route::post('/votes', [VoteController::class, 'store']);
Route::get('/votes/{userId}', [VoteController::class, 'checkVote']);
Route::get('/elections/{id}/results', [VoteController::class, 'getElectionResults']);
Route::get('/votersCount', [VoteController::class, 'getVotersCount']);

// Audit Logs Module
Route::get('/audit-logs', [AuditLogController::class, 'index']);
Route::post('/audit-logs', [AuditLogController::class, 'store']);

Route::put('/users/{id}/settings', [SettingsController::class, 'updateSettings']);
