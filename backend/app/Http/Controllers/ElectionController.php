<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;

class ElectionController extends Controller
{
    public function index()
    {
        return Election::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:100',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'start_time' => 'required',
            'end_date' => 'required|date|after_or_equal:start_date',
            'end_time' => 'required',
        ]);

        $elections = Election::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'start_time' => $request->start_time,
            'end_date' => $request->end_date,
            'end_time' => $request->end_time,
        ]);

        return response()->json([
            'message' => 'Election added successfully',
            'elections' => $elections
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:100',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'start_time' => 'required',
            'end_date' => 'required|date|after_or_equal:start_date',
            'end_time' => 'required',
        ]);

        $election = Election::findOrFail($id);

        $election->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'start_time' => $request->start_time,
            'end_date' => $request->end_date,
            'end_time' => $request->end_time,
        ]);

        return response()->json([
            'message' => 'Election updated successfully',
            'elections' => $election
        ], 200);
    }

    // Method to set an election as active
    public function setActiveElection($id)
    {
        // Deactivate all elections
        Election::query()->update(['is_active' => false]);

        // Set the selected election as active
        $election = Election::findOrFail($id);
        $election->update(['is_active' => true]);

        return response()->json([
            'message' => 'Election set as active',
            'election' => $election
        ]);
    }

    // Fetch the active election
    public function getActiveElection()
    {
        $activeElection = Election::where('is_active', true)->first();
        return response()->json($activeElection);
    }
}
