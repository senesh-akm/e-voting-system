<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    // Store a vote
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'candidate_id' => 'required|exists:candidates,id',
            'election_id' => 'required|exists:elections,id',
            'district' => 'required|string',
            'constituency' => 'required|string',
        ]);

        // Check if the user has already voted
        $existingVote = Vote::where('user_id', $validatedData['user_id'])
                            ->where('election_id', $validatedData['election_id'])
                            ->first();

        if ($existingVote) {
            return response()->json(['message' => 'User has already voted'], 403);
        }

        // Store the vote
        $vote = Vote::create($validatedData);

        return response()->json($vote, 201);
    }

    // Check if user has already voted
    public function checkVote($userId)
    {
        $vote = Vote::where('user_id', $userId)->first();

        if ($vote) {
            return response()->json($vote);
        }

        return response()->json(null, 404);
    }
}