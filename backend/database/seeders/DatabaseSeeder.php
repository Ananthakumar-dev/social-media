<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // call the seeder class in order whatever we want
        $this->call(ApiCredentialsSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(PostTableSeeder::class);
    }
}
