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
        array $validated,
        int $parentId,
        int $postId,
    ) {
        try {
            $parentComment = Comment::find($parentId);
            if ($parentComment->post_id != $postId) {
                return [
                    'success' => false,
                    'message' => 'The parent comment does not belong to the specified post.',
                ];
            }

            $comment = Comment::create([
                'post_id' => $postId,
                'user_id' => $this->authId,
                'parent_id' => $parentId, // Set the parent comment ID
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
            'data' => Comment::with('user')->where('id', $comment->id)->first()
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
}
