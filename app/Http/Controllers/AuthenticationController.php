<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function register(Request $request){
        $attr = $request->validate([
            'fullname' => 'required|string',
            'username'=>'required|string|unique:users,username',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'fullname' => $attr['fullname'],
            'username' => $attr['username'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);
        $token = $user->createToken('Tokens')->plainTextToken;
        return response([
            "token"=>$token,
            "user"=>$user
        ],201);
    }

    public function login(Request $request){
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'error' => 'Credentials do not match',
            ], 401);
        }

        $user = Auth::user();


        return response([
            'token' => auth()->user()->createToken('Tokens')->plainTextToken,
            'user' => auth()->user()
        ], 200);
    }

    public function logout(Request $request){
        auth()->user()->currentAccessToken()->delete();

        return response(["message"=>"Successfully logged out"],200);
    }

    public function getProfile($userId){
        $user = User::where('id',$userId)->first();
        return response(["user"=>$user]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $users = User::where('fullname', 'ilike', '%' . $query . '%')->limit(5)->get();

        $userArray = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'fullname' => $user->fullname,
                'username' => $user->username,
            ];
        });

        return response()->json($userArray);
    }
}
