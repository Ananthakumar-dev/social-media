<?php

namespace App\Services\Api;

use App\Models\Comment;
use Exception;
use Illuminate\Support\Facades\Auth;

class CommentService
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
     * Create a comment for particular post
     */
    public function create(
        array $validated,
        int $postId
    ) {
        try {
            $comment = Comment::create([
                'post_id' => $postId,
                'user_id' => $this->authId,
                'parent_id' => $validated['parent_id'] ?? null,
                'content' => $validated['content'],
            ]);
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'status' => true,
            'message' => 'Comment added successfully',
            'data' => Comment::with('user', 'replies.user')->where('id', $comment->id)->first()
        ];
    }

    /**
     * Create a reply for particular comment
     */
    public function reply(
        array $validated
    ) {
        try {
            $parentComment = Comment::find($validated['parent_id']);
            if ($parentComment->post_id != $validated['post_id']) {
                return [
                    'success' => false,
                    'message' => 'The parent comment does not belong to the specified post.',
                ];
            }

            Comment::create([
                'post_id' => $validated['post_id'],
                'user_id' => $this->authId,
                'parent_id' => $validated['parent_id'], // Set the parent comment ID
                'content' => $validated['content'],
            ]);
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'success' => true,
            'message' => 'Reply added successfully!',
        ];
    }

    /**
     * get all replies for a particular comment
     */
    public function getReplies(
        $commentId
    ) {
        $comment = Comment::with('replies.user')->find($commentId);

        if (!$comment) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not found.',
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Replies retrieved successfully!",
            "data" => $comment->replies,
        ]);
    }

    /**
     * get all comments for a particular post
     */
    public function getAllComments(
        $postId
    ) {
        try {
            $comments = Comment::with('user', 'replies.user')
                ->where('post_id', $postId)
                ->latest()
                ->get();
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'status' => true,
            'message' => 'Comments listed successfully',
            'data' => $comments
        ];
    }
}
