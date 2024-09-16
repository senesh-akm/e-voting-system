<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin@123'), // Always hash the password
            'voter_id' => 'ADM00000001',
            'role' => 'admin', // Set role to 'admin'
            'nic' => '',
            'address' => '',
            'district' => '',
            'constituency' => '',
            'theme' => 'dark', // Optionally set a theme for admin
        ]);
    }
}
