<?php

namespace App\Services;

use App\Models\Share;
use Exception;
use Illuminate\Support\Facades\Auth;

class ShareService
{
    private $authId;
    /**
     * initiate dependies
     */
    public function __construct()
    {
        $this->authId = Auth::id();
    }

    /**
     * Share a post
     */
    public function share(
        array $validated
    ) {
        try {
            // Check if already shared
            $share = Share::where('post_id', $validated['post_id'])->where('user_id', $this->authId)->first();
            if ($share) {
                return [
                    'success' => false,
                    'message' => 'Post already shared!',
                ];
            }

            $share = Share::create([
                'post_id' => $validated['post_id'],
                'user_id' => $this->authId,
            ]);
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'success' => true,
            'message' => 'Post shared successfully!',
            'data' => $share,
        ];
    }
}
