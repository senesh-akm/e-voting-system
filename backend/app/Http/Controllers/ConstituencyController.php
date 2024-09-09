<?php

namespace App\Http\Controllers;

use App\Models\Constituency;
use App\Models\District;
use Illuminate\Http\Request;

class ConstituencyController extends Controller
{
    // Fetch all constituencies
    public function index()
    {
        return response()->json(Constituency::with('district')->get());
    }

    // Store a new constituency
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:constituencies',
            'district_id' => 'required|exists:districts,id',
        ]);

        $constituencies = Constituency::create([
            'name' => $request->name,
            'district_id' => $request->district_id,
        ]);

        return response()->json([
            'message' => 'Constituency added successfully',
            'constituencies' => $constituencies
        ], 201);
    }

    // Fetch constituencies relevant district id
    public function getConstituency(Request $request)
    {
        $districtId = $request->query('district_id');  // Get district_id from query string

        if (!$districtId) {
            return response()->json(['error' => 'district_id is required'], 400);
        }

        // Fetch constituencies where district_id matches
        $constituencies = Constituency::where('district_id', $districtId)->get();

        return response()->json($constituencies);
    }

    // Fetch constituencies relevant district name
    public function getConstituenciesByDistrictName(Request $request)
    {
        $districtName = $request->query('district_name');

        // Assuming you have a District model that relates to Constituencies
        $district = District::where('name', $districtName)->first();

        if (!$district) {
            return response()->json([], 404); // No district found
        }

        // Retrieve constituencies related to the district
        $constituencies = $district->constituencies;

        return response()->json($constituencies, 200);
    }
}
