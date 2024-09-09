<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Fetch user data
    public function profile()
    {
        // Retrieve the authenticated user
        $user = Auth::profile();

        // Check if user is authenticated
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Return user data as JSON response
        return response()->json($user);
    }

    // Register new users
    public function register(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'voter_id' => 'required|string|unique:users',
                'role' => 'required|string|in:voter,admin',
                'profile_picture' => 'nullable|file|max:2048',
                'nic' => 'nullable|string',
                'address' => 'nullable|string',
                'district' => 'nullable|string',  // Validate as a string
                'constituency' => 'nullable|string',
            ]);

            // Handle the image upload
            if ($request->hasFile('profile_picture')) {
                $validated['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
            }

            // Create a new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'voter_id' => $request->voter_id,
                'role' => $request->role,
                'profile_picture' => $request->profile_picture ?? '',
                'nic' => $request->nic,
                'address' => $request->address,
                'district' => $request->district,  // Store district name instead of ID
                'constituency' => $request->constituency,
            ]);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            Log::error('User Registration Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while registering the user.',
            ], 500);
        }
    }

    // User login
    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to log in the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        // Retrieve the authenticated user
        $user = Auth::user();

        // Return a success message
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }

    // Update user
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8', // Password can be nullable, as it might not always change
            'voter_id' => 'required|string|unique:users,voter_id,' . $id,
            'role' => 'required|string|in:voter,admin',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Image validation
            'nic' => 'nullable|string',
            'address' => 'nullable|string',
            'district' => 'nullable|string',
            'constituency' => 'nullable|string',
        ]);

        // Find the user or fail
        $user = User::findOrFail($id);

        // Update user data
        $user->name = $request->name;
        $user->email = $request->email;

        // Only hash the password if it's present
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->voter_id = $request->voter_id;
        $user->role = $request->role;
        $user->nic = $request->nic;
        $user->address = $request->address;
        $user->district = $request->district;
        $user->constituency = $request->constituency;

        // Handle the profile picture upload
        if ($request->hasFile('profile_picture')) {
            $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            $user->profile_picture = $imagePath;
        }

        // Save the user data
        $user->save();

        // Return the updated user data
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ], 200);
    }

    // Logout user
    public function logout()
    {
        // Log out the user
        Auth::logout();

        // Return a success message
        return response()->json(['message' => 'Logout successful']);
    }
}
