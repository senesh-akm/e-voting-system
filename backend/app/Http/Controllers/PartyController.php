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
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|unique:parties,name|max:255',
            'party_logo' => 'nullable|file|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Create a new Party instance
        $party = new Party();
        $party->name = $request->name;

        // Check if a file was uploaded and handle file upload
        if ($request->hasFile('party_logo')) {
            $partyLogoPath = $request->file('party_logo')->store('party_logos', 'public');
            $party->party_logo = $partyLogoPath;
        }

        // Save the party to the database
        $party->save();

        return response()->json(['message' => 'Party created successfully!', 'party' => $party], 201);
    }

    // Find party
    public function find($id)
    {
        // Find the party by ID
        $party = Party::findOrFail($id);

        return response()->json(['party' => $party], 200);
    }

    // Update party
    public function update(Request $request, $id)
    {
        // Find the party by ID
        $party = Party::findOrFail($id);

        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|unique:parties,name,' . $party->id . '|max:255',
            'party_logo' => 'nullable|file|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Update the party details
        $party->name = $request->name;

        // Check if a new file was uploaded and handle file upload
        if ($request->hasFile('party_logo')) {
            $partyLogoPath = $request->file('party_logo')->store('party_logos', 'public');
            $party->party_logo = $partyLogoPath;
        }

        // Save the updated party to the database
        $party->save();

        return response()->json(['message' => 'Party updated successfully!', 'party' => $party], 200);
    }
}
