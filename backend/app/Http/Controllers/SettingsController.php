<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function updateTheme(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'theme' => 'required|boolean',
        ]);

        $user->theme = $request->theme;
        $user->save();
    }
}
