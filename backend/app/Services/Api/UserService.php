<?php

namespace App\Services\Api;

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
                if ($user->picture && Storage::exists($user->picture)) {
                    Storage::delete($user->picture);
                }

                // Store new profile picture
                $path = $validated['picture']->store('pictures', 'public');
                $user->picture = $path;
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
            'message' => 'Updated successfully',
            'picture' => $user->picture
        ];
    }

    /**
     * get user profile details 
     */
    public function getProfileDetails()
    {
        $user = Auth::user();

        return [
            'status' => true,
            'message' => 'User Fetched Successfully',
            'data' => $user
        ];
    }
}
