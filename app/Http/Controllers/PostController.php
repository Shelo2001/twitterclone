<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Comments;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function createPost(Request $request){
        $attr= $request->validate([
            'text' => 'required|string',
            'user_id' => 'required'
        ]);
        $post = Post::create([
            'text'=>$attr['text'],
            'user_id'=>$attr['user_id'],
        ]);

        return response(["post"=>$post],201);
    }

    public function getMyPosts($userId){
        $posts = Post::where('user_id', $userId)
                    ->orderBy('updated_at', 'desc')
                    ->with('likes')
                    ->with('comments.user:id,fullname')
                    ->get();

        return response($posts);
    }

    public function likeOrUnlikePost(Request $request){
        $post = Post::findOrFail($request['post_id']);
    
        $existingLike = Like::where('post_id', $request['post_id'])
                            ->where('user_id', $request['user_id'])
                            ->first();
                            
        if ($existingLike) {
            $existingLike->delete();
            return response()->json(['message' => 'Post unliked']);
        } else {
            $like = new Like();
            $like->post_id = $request['post_id'];
            $like->user_id = $request['user_id'];
            $like->save();
            return response()->json(['message' => 'Post liked']);
        }
    }

    public function createComment(Request $request){
        $attr= $request->validate([
            'comment' => 'required|string',
            'comment_user_id' => 'required',
            'post_id' => 'required'
        ]);
        $comment = Comments::create([
            'comment'=>$attr['comment'],
            'comment_user_id'=>$attr['comment_user_id'],
            'post_id'=>$attr['post_id'],
        ]);

        return response(["comment"=>$comment],201);
    }
}
