<?php

namespace App\Services\Api;

use App\Models\Post;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FeedService
{
    /**
     * get all feeds - show feeds in home page
     */
    public function feeds(
        $request
    ) {
        try {
            $user_id = Auth::id();

            // Define the number of posts per page (pagination)
            $perPage = $request->get('per_page', PAGINATION); // Default to 10 posts per page

            // Fetch posts with pagination, comments count, likes count, and shares count
            $posts = Post::with([
                'user:id,name,picture',  // User info for the post
            ])
                ->withCount(['comments', 'likes', 'shares'])  // Get counts for comments, likes, and shares
                ->addSelect([
                    DB::raw("(SELECT COUNT(id) FROM likes WHERE likes.user_id = '$user_id' AND likes.post_id = posts.id) AS liked"),
                    DB::raw("(SELECT COUNT(id) FROM shares WHERE shares.user_id = '$user_id' AND shares.post_id = posts.id) AS shared"),
                ])
                ->orderBy('created_at', 'desc')  // Newest posts first
                ->paginate($perPage);  // Pagination

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        // Return paginated posts
        return [
            'status' => true,
            'message' => 'Feed fetched successfully!',
            'data' => $posts,
        ];
    }
}
