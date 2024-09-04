<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'candidate_id' => 'required|exists:candidates,id',
            'election_id' => 'required|exists:elections,id',
            'district' => 'required|string',
            'constituency' => 'required|string',
        ]);

        $vote = Vote::create($validatedData);

        return response()->json($vote, 201);
    }
}
