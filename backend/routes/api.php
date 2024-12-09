<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FeedsController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ShareController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Non-authorized
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/feeds', [FeedsController::class, 'feeds']);

// Authorized routes
Route::middleware('auth:api')->group(function () {
    // user 
    Route::get('/user/profile', [UserController::class, 'getProfile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/posts', [UserController::class, 'getUserPosts']);

    // posts
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{postId}/comments', [PostController::class, 'getComments']);

    // comments
    Route::get('/posts/{postId}/comments', [CommentController::class, 'comments']); // Fetch comments for a post
    Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::post('/comments/reply', [CommentController::class, 'replyToComment']);
    Route::get('/comments/{commentId}/replies', [CommentController::class, 'getReplies']);

    // likes
    Route::post('/posts/like', [LikeController::class, 'toggleLike']);

    // Share
    Route::post('/posts/share', [ShareController::class, 'store']);
});
