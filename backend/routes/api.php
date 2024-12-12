<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FeedsController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ShareController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

// Non-authorized
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/feeds', [FeedsController::class, 'feeds']);

// non-authorized posts & comment - because post comments and details are publically accessable
Route::get('/posts/{postId}/comments', [PostController::class, 'getComments']);
Route::get('/posts/{post}/details', [PostController::class, 'getPostDetails']);
Route::get('/comments/{commentId}/replies', [CommentController::class, 'getReplies']);

// Authorized routes
Route::middleware('auth:api')->group(function () {
    // user 
    Route::get('/user/profile', [UserController::class, 'getProfile']);
    Route::post('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/posts', [UserController::class, 'getUserPosts']);

    // posts
    Route::post('/posts', [PostController::class, 'store']);

    // comments
    Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::post('/comments/{parentId}/{postId}/reply', [CommentController::class, 'replyToComment']);

    // likes
    Route::post('/posts/like', [LikeController::class, 'toggleLike']);

    // Share
    Route::post('/posts/share', [ShareController::class, 'store']);

    // payment
    Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::get('/payments', [PaymentController::class, 'payments']);
    Route::get('/stripe-key', [PaymentController::class, 'stripeKey']);

    // logout
    Route::post('logout', [AuthController::class, 'logout']);
});
