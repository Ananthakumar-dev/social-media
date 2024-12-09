<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Services\Api\PostService;
use App\Services\Api\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * initiate dependencies
     */
    public function __construct(
        private UserService $userService
    ) {
        //
    }

    // update user profile
    public function updateProfile(
        UpdateProfileRequest $updateProfileRequest,
    ) {
        $validatedFields = $updateProfileRequest->validated();

        return $this->userService->updateProfile(
            validated: $validatedFields
        );
    }

    // get user profile details
    public function getProfile(
        UserService $userService
    ) {
        return $this->userService->getProfileDetails();
    }

    /**
     * get all posts relates to user
     */
    public function getUserPosts(
        PostService $postService,
        Request $request
    ) {
        return $postService->getPosts(
            $request
        );
    }
}
