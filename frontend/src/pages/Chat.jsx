import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/auth";
import { Input, Button, Divider, Segment } from "semantic-ui-react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { user } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const sendMessage = () => {
        axios
            .post(`${import.meta.env.VITE_BASE_API_URL}/messages`, {
                sender_id: currentUser.id,
                receiver_id: user.id,
                message: newMessage,
            })
            .then((response) => {
                console.log(response.data.message);
                setNewMessage("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
        getChatHistory();
    }, []);

    return (
        <Segment style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center" }}>Chat</h2>
            <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                {messages.map((message) => (
                    <Segment
                        style={
                            message.sender_id === currentUser.id
                                ? {
                                      backgroundColor: "white",
                                      textAlign: "right",
                                  }
                                : { backgroundColor: "#B6EAFA" }
                        }
                        key={message.id}
                    >
                        <p
                            style={
                                message.sender_id === currentUser.id
                                    ? { fontWeight: "bold", textAlign: "right" }
                                    : { fontWeight: "bold" }
                            }
                        >
                            {message.sender_id === currentUser.id
                                ? `You`
                                : `${user.fullname}`}
                        </p>
                        <p>{message.message}</p>
                    </Segment>
                ))}
            </div>
            <Divider />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                    fluid
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ marginRight: "10px", width: "100%" }}
                />
                <Button primary onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </Segment>
    );
};

export default Chat;
