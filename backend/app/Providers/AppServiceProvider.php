<?php

namespace App\Providers;

use App\Services\CacheStore;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // binding cache store to the service container
        $this->app->singleton(CacheStore::class, function () {
            return new CacheStore;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Config::set('auth.defaults.guard', 'api'); // set default guard is api

        Model::preventLazyLoading(); // prevent n+1 lazy queries
    }
}
