<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ShareRequest;
use App\Services\ShareService;
use Illuminate\Http\Request;

class ShareController extends Controller
{
    /**
     * create a post share
     */
    public function store(
        ShareRequest $shareRequest,
        ShareService $shareService
    ) {
        $validatedFields = $shareRequest->validated();

        return $shareService->share(
            validated: $validatedFields
        );
    }
}