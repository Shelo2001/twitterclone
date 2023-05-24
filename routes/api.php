<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\AuthenticationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile/{userId}',[AuthenticationController::class, 'getProfile']);
    Route::get('/logout', [AuthenticationController::class, 'logout']);
    Route::post('/post/create', [PostController::class, 'createPost']);
    Route::get('/post/myposts/{userId}', [PostController::class, 'getMyPosts']);
    Route::post('/post/like', [PostController::class, 'likeOrUnlikePost']);
    Route::post('/post/comment/create', [PostController::class, 'createComment']);
});
Route::get('/users/search', [AuthenticationController::class, 'search']);
Route::post('/messages', [MessagesController::class, 'sendMessage']);
    Route::get('/messages/{senderId}/{receiverId}', [MessagesController::class, 'getChatHistory']);