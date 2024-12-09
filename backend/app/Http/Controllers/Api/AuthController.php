<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Services\Api\RegisterService;
use App\Services\Jwt\TokenService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

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

    /**
     * Logout functionality
     */
    public function logout()
    {
        Auth::logout();

        return [
            'status' => true,
            'message' => 'Logout Successfully'
        ];
    }
}
