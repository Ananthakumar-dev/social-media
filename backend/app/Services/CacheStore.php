<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CacheStore
{
    /**
     * get api credentials
     */
    public function api_credentials()
    {
        return Cache::rememberForever('api_credentials', function () {
            return DB::table('api_credentials')
                ->get()
                ->groupBy('site')
                ->map(function ($el) {
                    // Create an array of key => value for each site
                    return $el->pluck('value', 'name')->toArray();
                })
                ->toArray();
        });
    }
}
