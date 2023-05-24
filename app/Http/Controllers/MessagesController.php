<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MessagesController extends Controller
{
    public function sendMessage(Request $request)
    {
        $attr = $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'message' => 'required',
        ]);


        $message = Messages::create([
            'sender_id' => $attr['sender_id'],
            'receiver_id' =>$attr['receiver_id'],
            'message' =>$attr['message'],
        ]);

        return response()->json(['message' => 'Message sent successfully']);
    }

    public function getChatHistory($senderId, $receiverId)
    {
        $messages = Messages::whereIn('sender_id', [$senderId, $receiverId])
            ->whereIn('receiver_id', [$senderId, $receiverId])
            ->get();
            
        return response()->json($messages);
    }
}
