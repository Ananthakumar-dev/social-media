<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Method to update user profile
    public function updateProfile(
        UpdateProfileRequest $updateProfileRequest,
        UserService $userService
    )
    {
        $validatedFields = $updateProfileRequest->validated();

        return $userService->updateProfile(
            validated: $validatedFields
        );
    }
}
