<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Game;
use Illuminate\Support\Facades\Auth;


class GameController extends Controller
{
   public function newGame()
   {
	   	$user = Auth::user();
	    return Game::create(['player1_id' => $user->id]);   	
   }
   
   public function index()
   {
   	 return Game::where('status', '=', '0')->with('playerOne','playerTwo')->get(); 
   }
}
