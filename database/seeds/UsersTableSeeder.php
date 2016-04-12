<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')
            ->insert([
                'name' => 'Ico Petrov',
                'email' => 'test.test@test.com',
                'password' => bcrypt('test'),
                'api_token' => md5('test')
            ]);
    }
}
