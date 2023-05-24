import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/auth";

const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { user } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Function to send a new message
    const sendMessage = () => {
        axios
            .post(`${import.meta.env.VITE_BASE_API_URL}/messages`, {
                sender_id: currentUser.id,
                receiver_id: user.id,
                message: newMessage,
            })
            .then((response) => {
                console.log(response.data.message);
                // Clear the input field after sending the message
                setNewMessage("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Function to retrieve the chat history
    const getChatHistory = () => {
        axios
            .get(
                `${import.meta.env.VITE_BASE_API_URL}/messages/${
                    currentUser.id
                }/${user.id}`
            )
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        // Retrieve the chat history when the component mounts
        getChatHistory();
    }, []);

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <p>Sender: {message.sender_id}</p>
                        <p>Receiver: {message.receiver_id}</p>
                        <p>Content: {message.message}</p>
                        <hr />
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
