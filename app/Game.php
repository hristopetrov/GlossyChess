<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
	protected $fillable = ['player1_id', 'player2_id'];
	
	public $timestamps = false;
	
  	public function playerOne()
    {
    	return $this->belongsTo(User::class,'player1_id', 'id' ,'user');
    }
    
    public function playerTwo()
    {
    	return $this->belongsTo(User::class,'player2_id', 'id' ,'user');
    }
    
    
}
