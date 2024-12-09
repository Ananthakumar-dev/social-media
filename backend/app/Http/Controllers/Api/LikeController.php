<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LikeRequest;
use App\Services\Api\LikeService;

class LikeController extends Controller
{
    /**
     * Toggling like for a post
     */
    public function toggleLike(
        LikeRequest $likeRequest,
        LikeService $likeService
    ) {
        $validatedFields = $likeRequest->validated();

        return $likeService->likeOrUnlikePost(
            validated: $validatedFields
        );
    }
}
