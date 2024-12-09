<?php

namespace App\Services\Api;

use App\Models\Comment;
use App\Models\Post;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostService
{
    /**
     * Store post
     */
    public function create(
        array $validated
    ) {
        try {
            $imagePath = null;
            if (isset($validated['image'])) {
                $imagePath = $validated['image']->store('posts', 'public');
            }

            // Create the post
            Post::create([
                'user_id' => Auth::id(), // Authenticated user's ID
                'title' => $validated['title'],
                'content' => $validated['content'],
                'image' => $imagePath, // Store the image path
            ]);
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'success' => true,
            'message' => 'Post created successfully!',
        ];
    }

    /**
     * get all comments related to posts
     */
    public function getComments(
        $postId
    ) {
        try {
            // Ensure the post exists
            $post = Post::find($postId);

            if (!$post) {
                return [
                    'success' => false,
                    'message' => 'Post not found.',
                ];
            }

            // Fetch all comments and their replies for the given post
            $comments = Comment::with(['replies.user', 'user'])
                ->where('post_id', $postId)
                ->whereNull('parent_id') // Fetch only parent comments
                ->orderBy('created_at', 'desc')
                ->get();
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'success' => true,
            'message' => 'Comments retrieved successfully!',
            'data' => $comments,
        ];
    }

    /**
     * get all posts relates to user
     */
    public function getPosts(
        $request
    ) {
        try {
            $userId = Auth::id();
            // Validate if the user exists
            $user = \App\Models\User::find($userId);

            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'User not found.',
                ];
            }

            // Fetch all posts by the user with related data
            $posts = Post::with(['user'])
                ->withCount(['comments', 'likes', 'shares'])
                ->where('user_id', $userId)
                ->addSelect([
                    DB::raw("(SELECT COUNT(id) FROM likes WHERE likes.user_id = '$userId' AND likes.post_id = posts.id) AS liked"),
                    DB::raw("(SELECT COUNT(id) FROM shares WHERE shares.user_id = '$userId' AND shares.post_id = posts.id) AS shared"),
                ])
                ->orderBy('created_at', 'desc') // Order by newest first
                ->get();
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'success' => true,
            'message' => 'Posts retrieved successfully!',
            'data' => $posts,
        ];
    }

    /**
     * get post details
     */
    public function getPostDetails(
        $postId
    ) {
        try {
            $post = Post::findOrFail($postId);

            $comments = $post->comments()
                ->with('user:id,name,picture,created_at') // Include user details
                ->get();

            $likes = $post->likes()
                ->with('user:id,name,picture,created_at') // Include user details
                ->get();

            $shares = $post->shares()
                ->with('user:id,name,picture,created_at') // Include user details
                ->get();
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'comments' => $comments,
            'likes' => $likes,
            'shares' => $shares,
        ];
    }
}
