<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Services\LoginService;
use App\Services\RegisterService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

final class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(
        RegisterRequest $registerRequest,
        RegisterService $registerService,
        TokenService $tokenService
    ) {
        // validate request
        $validatedFields = $registerRequest->validated();

        // create user
        $create = $registerService->create(
            validated: $validatedFields
        );
        if (!$create['status']) {
            return response()->json([
                'status' => false,
                'message' => $create['message']
            ], 401);
        }

        // issue jwt token to user
        $issueToken = $tokenService->issue(
            credentials: Arr::only(
                $validatedFields,
                ['email', 'password']
            )
        );
        if (!$issueToken['status']) {
            return response()->json([
                'status' => false,
                'message' => $issueToken['message']
            ], 401);
        }

        return $issueToken;
    }

    /**
     * Authorize a new user
     */
    public function authenticate(
        LoginRequest $loginRequest,
        TokenService $tokenService
    ) {
        $validatedFields = $loginRequest->validated();

        // issue jwt token to user
        $issueToken = $tokenService->issue(
            credentials: Arr::only(
                $validatedFields,
                ['email', 'password']
            )
        );
        if (!$issueToken['status']) {
            return response()->json([
                'status' => false,
                'message' => $issueToken['message']
            ], 401);
        }

        return $issueToken;
    }
}
