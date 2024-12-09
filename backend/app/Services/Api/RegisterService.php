<?php

namespace App\Services\Api;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class RegisterService
{
    /**
     * Create new user
     */
    public function create(
        array $validated
    ) {
        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'status' => 'true',
            'message' => 'User created'
        ];
    }
}
