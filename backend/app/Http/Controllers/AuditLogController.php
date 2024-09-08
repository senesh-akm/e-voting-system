<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditLog::query();

        // Filter by user_id if provided
        if ($request->has('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        // Order by the most recent logs first
        $query->orderBy('created_at', 'desc');

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'action' => 'required|string',
            'description' => 'nullable|string',
            'user_id' => 'required|exists:users,id'
        ]);

        $log = AuditLog::create($request->all());

        return response()->json($log, 201);
    }
}
