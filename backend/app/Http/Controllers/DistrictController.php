<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    // Fetch the list of districts
    public function index()
    {
        $districts = District::all();
        return response()->json($districts);
    }

    // Add a new party
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:districts,name',
        ]);

        $districts = District::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'District added successfully',
            'district' => $districts
        ], 201);
    }
}
