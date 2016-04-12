<?php

use App\Http\Controllers\GameController;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|


Route::get('/', function () {
    return view('welcome');
});
*/




Route::get('/', function () {
    return view('chess.index');
});
Route::group(['prefix' => 'api'],function(){
    Route::auth();
    Route::post('/user/register', 'UserController@register');
    Route::post('/user/login', 'UserController@login');
    Route::post('/user/logout', 'UserController@logout');
    Route::put('/user/{id}', 'UserController@update');  //update user info
    Route::get('/profile','UserController@activeUsers');
    
    Route::group(['middleware' => 'web'], function () {
    	Route::get('/freegames', 'GameController@index');
   		Route::get('/newgame', 'GameController@newGame');
   		Route::get('/joingame', 'GameController@joinGame');
    	Route::get('/checkgame/{id}', 'GameController@getGameStatus'); 
    });
});

