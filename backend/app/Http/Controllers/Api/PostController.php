<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreatePostRequest;
use App\Services\PostService;

class PostController extends Controller
{
    /**
     * initiate dependencies
     */
    public function __construct(
        private PostService $postService
    ) {
        //
    }

    /**
     * create post from a user
     */
    public function store(
        CreatePostRequest $createPostRequest
    ) {
        // get validated fields
        $validatedFields = $createPostRequest->validated();

        // create post
        $createPost = $this->postService->create(
            validated: $validatedFields
        );

        return $createPost;
    }

    /**
     * get all comments relates to posts
     */
    public function getComments(
        int $postId
    ) 
    {
        return $this->postService->getComments(
            postId: $postId
        );
    }

    /**
     * get all posts relates to user
     */
    public function getUserPosts(
        int $userId
    )
    {
        return $this->postService->getPosts(
            userId: $userId
        );
    }
}
