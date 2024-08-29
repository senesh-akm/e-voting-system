<?php

namespace App\Http\Controllers;

use App\Models\Constituency;
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
}
