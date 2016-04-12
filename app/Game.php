<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
  	public function playerOne()
    {
    	return $this->belongsTo(User::class,'player1_id', 'id' ,'user');
    }
    
    public function playerTwo()
    {
    	return $this->belongsTo(User::class,'player2_id', 'id' ,'user');
    }
}
