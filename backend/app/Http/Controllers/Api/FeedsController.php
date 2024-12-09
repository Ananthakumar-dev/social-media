<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\FeedService;
use Illuminate\Http\Request;

class FeedsController extends Controller
{
    /**
     * get all feeds
     */
    public function feeds(
        Request $request,
        FeedService $feedService
    ) {

        return $feedService->feeds(
            request: $request
        );
    }
}
