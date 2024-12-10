<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->delete();

        DB::table('users')->insert([
            [
                'name' => 'taidara',
                'email' => 'taidara@yopmail.com',
                'password' => bcrypt('12345678'),
                'picture' => 'pictures/taidara.jpg'
            ]
        ]);
    }
}
