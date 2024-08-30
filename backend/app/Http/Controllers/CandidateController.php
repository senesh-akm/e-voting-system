<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    // Fetch all candidates for a specific election
    public function index($election_id)
    {
        $candidates = Candidate::where('election_id', $election_id)->get();
        return response()->json($candidates);
    }

    // Fetch all candidates
    public function all()
    {
        $candidates = Candidate::all();
        return response()->json($candidates);
    }

    // Store a new candidate
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'party' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'election_id' => 'required|exists:elections,id',
        ]);

        $candidate = Candidate::create($request->all());

        return response()->json([
            'message' => 'Candidate added successfully',
            'candidate' => $candidate
        ], 201);
    }

    // Update an existing candidate
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'party' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'election_id' => 'required|exists:elections,id',
        ]);

        $candidate = Candidate::findOrFail($id);
        $candidate->update($request->all());

        return response()->json([
            'message' => 'Candidate updated successfully',
            'candidate' => $candidate
        ]);
    }

    // Delete a candidate
    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();

        return response()->json(['message' => 'Candidate deleted successfully']);
    }
}
