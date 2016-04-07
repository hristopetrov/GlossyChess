<?php
namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
class UserController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'min:4|max:8'
        ]);
        $email = $request->input('email');
        $password = $request->input('password');
        if(Auth::attempt(['email' => $email, 'password' => $password])){
            return Auth::user();
        } else {
            return response(['error' => 'There is no such user.'], 404);
        }
    }

    public function register(Request $request)
    {

        $this->validate($request, [
            'username' => 'required|min:2',
            'email' => 'required|email|unique:users,email',
            'password' => 'min:4|max:8|confirmed',
            'password_confirmation' => 'min:4|max:8|same:password'
        ]);
        $user = new User();
        $user->name = $request->input('username');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->api_token = str_random(60);
        $user->save();

        return $user;
    }

}