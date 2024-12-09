<?php

namespace App\Services\Jwt;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class TokenService
{
    /**
     * Issue token to user
     */
    public function issue(
        array $credentials
    ) {
        // extract email & password from credentials whatever persists
        $credentials = Arr::only(
            $credentials,
            ['email', 'password']
        );

        if (! $token = Auth::attempt($credentials)) {
            return [
                'status' => false,
                'message' => 'Unauthorized'
            ];
        }

        return $this->respondWithToken($token);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token): array
    {
        return [
            'status' => true,
            'message' => 'Token created successfully',
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ];
    }
}
