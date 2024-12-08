<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserService
{
    /**
     * update user profile
     */
    public function updateProfile(
        array $validated
    ) {
        try {
            $user = Auth::user();

            // Update the user's name and email
            $user->name = $validated['name'];
            $user->email = $validated['email'];

            // Handle profile picture upload
            if (isset($validated['picture'])) {
                // Delete old profile picture if it exists
                if ($user->profile_picture && Storage::exists($user->profile_picture)) {
                    Storage::delete($user->profile_picture);
                }

                // Store new profile picture
                $path = $validated['picture']->store('profile_pictures', 'public');
                $user->profile_picture = $path;
            }

            // Save the user
            $user->save();
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'status' => true,
            'message' => 'Updated successfully'
        ];
    }
}