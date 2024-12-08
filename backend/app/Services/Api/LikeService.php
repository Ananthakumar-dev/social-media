<?php

namespace App\Services;

use App\Models\Like;
use Exception;
use Illuminate\Support\Facades\Auth;

class LikeService
{
    private $authId;
    /**
     * initiate dependies
     */
    public function __construct()
    {
        $this->authId = Auth::id();
    }

    /**
     * like for a post
     */
    public function likeOrUnlikePost(
        array $validated
    ) {
        try {
            $like = Like::where('post_id', $validated['post_id'])
                ->where('user_id', $this->authId)
                ->first();

            if ($like) {
                $like->delete();

                return [
                    'success' => true,
                    'message' => 'Post unliked successfully!',
                ];
            } else {
                Like::create([
                    'post_id' => $validated['post_id'],
                    'user_id' => $this->authId,
                ]);

                return [
                    'success' => true,
                    'message' => 'Post liked successfully!',
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }
    }
}
