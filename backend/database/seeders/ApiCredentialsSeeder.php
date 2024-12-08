<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApiCredentialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('api_credentials')->delete();

        DB::table('api_credentials')->insert(
            [
                ['name' => 'public_key', 'value' => 'YOUR_KEY', 'site' => 'Stripe'],
                ['name' => 'secret_key', 'value' => 'YOUR_KEY', 'site' => 'Stripe'],
            ]
        );
    }
}
