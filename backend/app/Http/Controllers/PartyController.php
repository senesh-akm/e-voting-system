<?php

namespace App\Http\Controllers;

use App\Models\Party;
use Illuminate\Http\Request;

class PartyController extends Controller
{
    // Fetch the list of parties
    public function index()
    {
        $parties = Party::all();
        return response()->json($parties);
    }

    // Add a new party
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:parties,name',
        ]);

        $party = Party::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Party added successfully',
            'party' => $party
        ], 201);
    }
}
