<?php

use Illuminate\Database\Seeder;

class GameTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i <= 9 ;$i++){
        	DB::table('games')
        			->insert([
        					'player1_id' => '1',
        					'status'	=> '0',
        			]);
        }
    }
}
