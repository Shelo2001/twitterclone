import React, { useState } from "react";
import {
    Button,
    Card,
    Divider,
    Form,
    Grid,
    Image,
    Popup,
    TextArea,
} from "semantic-ui-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Link } from "react-router-dom";
import { usePosts } from "../services/posts";

const PostCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => setIsOpen(!isOpen);

    const [text, setText] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    const { createPost, loading } = usePosts();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = {
            text,
            user_id: user.id,
        };
        createPost(data);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card style={{ minWidth: "30%" }}>
                <Link to={`/profile/${user.fullname}/${user.id}`}>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "100px",
                            position: "absolute",
                            left: "-70px",
                        }}
                    />
                </Link>
                <Card.Content
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Form style={{ minWidth: "100%" }}>
                        <TextArea
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's happening?"
                            value={text}
                            style={{
                                minHeight: 40,
                                border: "none",
                                resize: "none",
                                fontSize: "1.6em",
                            }}
                        />
                        <Divider section />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <Popup
                                    trigger={
                                        <Button
                                            basic
                                            color="blue"
                                            circular
                                            icon="file image"
                                        />
                                    }
                                    flowing
                                    hoverable
                                >
                                    <Grid centered divided columns={1}>
                                        <Grid.Column textAlign="center">
                                            <Button>Upload Image</Button>
                                        </Grid.Column>
                                    </Grid>
                                </Popup>

                                <Popup
                                    open={isOpen}
                                    onClose={togglePopup}
                                    trigger={
                                        <Button
                                            basic
                                            color="blue"
                                            circular
                                            icon="smile"
                                            onClick={togglePopup}
                                            style={{
                                                marginLeft: "5px",
                                            }}
                                        />
                                    }
                                    content={
                                        <Picker
                                            data={data}
                                            onEmojiSelect={(e) =>
                                                setText(text + e.native)
                                            }
                                        />
                                    }
                                    on="click"
                                    position="top center"
                                />
                            </div>

                            <div>
                                <Button
                                    style={{
                                        borderRadius: "30px",
                                    }}
                                    inverted
                                    onClick={onSubmitHandler}
                                    color="blue"
                                    loading={loading}
                                >
                                    Tweet
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    );
};

export default PostCard;
