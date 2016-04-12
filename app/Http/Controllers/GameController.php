<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Game;

class GameController extends Controller
{
   public function addGame()
   {
   	
   	
   }
   
   public function index()
   {
   	
   	 return Game::where('status', '=', '0')->with('playerOne','playerTwo')->get(); 
   }
}
