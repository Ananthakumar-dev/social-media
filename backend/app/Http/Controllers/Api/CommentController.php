<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ReplyToCommentRequest;
use App\Http\Requests\CommentRequest;
use App\Services\CommentService;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * initiate dependencies
     */
    public function __construct(
        private CommentService $commentService
    )
    {
        //
    }

    /**
     * Create a comment for post
     */
    public function store(
        CommentRequest $commentRequest
    )
    {
        // get validated datas
        $validatedFields = $commentRequest->validated();

        // create a comment for a post
        return $this->commentService->create(
            validated: $validatedFields
        );
    }

    /**
     * Reply to a particular comment
     */
    public function replyToComment(
        ReplyToCommentRequest $replyToCommentRequest
    )
    {
        $validatedFields = $replyToCommentRequest->validated();

        return $this->commentService->reply(
            validated: $validatedFields
        );
    }

    /**
     * get all replies for a particular comment
     */
    public function getReplies(
        int $commentId
    )
    {
        return $this->commentService->getReplies(
            commentId: $commentId
        );
    }
}
