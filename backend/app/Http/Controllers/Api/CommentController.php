<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ReplyToCommentRequest;
use App\Http\Requests\CommentRequest;
use App\Models\Post;
use App\Services\Api\CommentService;

class CommentController extends Controller
{
    /**
     * initiate dependencies
     */
    public function __construct(
        private CommentService $commentService
    ) {
        //
    }

    /**
     * Create a comment for post
     */
    public function store(
        CommentRequest $commentRequest,
        int $postId
    ) {
        // get validated datas
        $validatedFields = $commentRequest->validated();

        // create a comment for a post
        return $this->commentService->create(
            validated: $validatedFields,
            postId: $postId
        );
    }

    /**
     * Reply to a particular comment
     */
    public function replyToComment(
        ReplyToCommentRequest $replyToCommentRequest,
        int $parentId,
        int $postId
    ) {
        $validatedFields = $replyToCommentRequest->validated();

        return $this->commentService->reply(
            validated: $validatedFields,
            parentId: $parentId,
            postId: $postId,
        );
    }

    /**
     * get all replies for a particular comment
     */
    public function getReplies(
        int $commentId
    ) {
        return $this->commentService->getReplies(
            commentId: $commentId
        );
    }
}
