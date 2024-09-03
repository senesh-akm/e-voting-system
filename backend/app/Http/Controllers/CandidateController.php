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
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'candidate_picture' => 'nullable|file|mimes:jpg,png,jpeg|max:2048',
            'party' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'election_id' => 'required|exists:elections,id',
        ]);

        // Handle the image upload
        if ($request->hasFile('candidate_picture')) {
            $path = $request->file('candidate_picture')->store('candidate_pictures', 'public');
        } else {
            $path = '';
        }

        // Create a new candidate
        $candidate = Candidate::create([
            'name' => $request->name,
            'candidate_picture' => $path,
            'party' => $request->party,
            'biography' => $request->biography,
            'election_id' => $request->election_id,
        ]);

        // Return a success message
        return response()->json([
            'message' => 'Candidate added successfully',
            'candidate' => $candidate
        ], 201);
    }

    // Update an existing candidate
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'candidate_picture' => 'nullable|file|mimes:jpg,png,jpeg|max:2048',
            'party' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'election_id' => 'required|exists:elections,id',
        ]);

        // Find the candidate or fail
        $candidate = Candidate::findOrFail($id);

        // Handle the image upload
        if ($request->hasFile('candidate_picture')) {
            $path = $request->file('candidate_picture')->store('candidate_pictures', 'public');
        } else {
            $path = $candidate->candidate_picture;  // Keep existing picture if no new one is uploaded
        }

        // Update candidate
        $candidate->update([
            'name' => $request->name,
            'candidate_picture' => $path,
            'party' => $request->party,
            'biography' => $request->biography,
            'election_id' => $request->election_id,
        ]);

        // Return a success message
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
