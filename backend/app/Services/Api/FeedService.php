<?php

namespace App\Services\Api;

use App\Models\Post;
use Exception;

class FeedService
{
    /**
     * get all feeds - show feeds in home page
     */
    public function feeds(
        $request
    ) {
        try {
            // Define the number of posts per page (pagination)
            $perPage = $request->get('per_page', PAGINATION); // Default to 10 posts per page

            // Fetch posts with pagination, comments count, likes count, and shares count
            $posts = Post::with([
                'user:id,name,profile_picture',  // User info for the post
            ])
                ->withCount(['comments', 'likes', 'shares'])  // Get counts for comments, likes, and shares
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
            'success' => true,
            'message' => 'Feed fetched successfully!',
            'data' => $posts,
        ];
    }
}
