import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Comment,
    Dropdown,
    Header,
    Icon,
    Image,
    Input,
    Label,
} from "semantic-ui-react";
import { usePosts } from "../services/posts";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/auth";

const Profile = () => {
    const { id } = useParams();
    const { getMyPosts, myPosts, likeOrUnlikePost, createComment } = usePosts();
    const { getUserProfile, user } = useAuth();
    const [updatedPosts, setUpdatedPosts] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getMyPosts(id);
        getUserProfile(id);
    }, []);

    useEffect(() => {
        setUpdatedPosts(myPosts);
    }, [myPosts]);

    const hasLikedPost = (post) => {
        return post.likes.some((like) => like.user_id === currentUser.id);
    };

    const unlikeHandler = async (post) => {
        let data = {
            post_id: post.id,
            user_id: currentUser.id,
        };
        await likeOrUnlikePost(data);
        const updated = updatedPosts.map((p) => {
            if (p.id === post.id) {
                return {
                    ...p,
                    likes: p.likes.filter(
                        (like) => like.user_id !== currentUser.id
                    ),
                };
            }
            return p;
        });
        setUpdatedPosts(updated);
    };

    const likeHandler = async (post) => {
        let data = {
            post_id: post.id,
            user_id: currentUser.id,
        };
        await likeOrUnlikePost(data);
        const updated = updatedPosts.map((p) => {
            if (p.id === post.id) {
                return {
                    ...p,
                    likes: [...p.likes, { user_id: currentUser.id }],
                };
            }
            return p;
        });
        setUpdatedPosts(updated);
    };

    const [comment, setComment] = useState("");

    const sendCommentHandler = async (post) => {
        let data = {
            comment,
            comment_user_id: currentUser.id,
            post_id: post.id,
        };

        await createComment(data);
    };

    return (
        <>
            <div style={{ position: "absolute", left: "50px", top: "50px" }}>
                <Link to="/home">
                    <Button circular icon>
                        <Icon name="arrow left" />
                    </Button>
                </Link>
            </div>

            <Card color="blue" style={{ width: "40%", margin: "auto" }}>
                <Card.Content>
                    <Image
                        floated="right"
                        size="mini"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                    />
                    <Card.Header>{user.fullname}</Card.Header>
                    <Card.Meta>@{user.username}</Card.Meta>
                    <Card.Description>
                        <strong>{user.email}</strong>
                    </Card.Description>
                </Card.Content>
                {currentUser.id == id ? (
                    <Card.Content extra>
                        <div>
                            <Button style={{ width: "49%" }} basic color="blue">
                                Followers
                            </Button>
                            <Button style={{ width: "50%" }} color="blue">
                                Following
                            </Button>
                        </div>
                    </Card.Content>
                ) : (
                    <Card.Content extra>
                        <div>
                            <Button style={{ width: "49%" }} basic color="blue">
                                Message
                            </Button>
                            <Button style={{ width: "50%" }} color="blue">
                                Follow
                            </Button>
                        </div>
                    </Card.Content>
                )}
            </Card>

            <div style={{ margin: "auto", width: "60%", marginTop: "50px" }}>
                <h1>Tweets</h1>
                {updatedPosts.length > 0 ? (
                    updatedPosts.map((post) => (
                        <Card fluid>
                            <Dropdown
                                icon={"th"}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "10px",
                                }}
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item text="Retweet" />
                                </Dropdown.Menu>
                            </Dropdown>
                            <Card.Content>
                                <Card.Header>{user.fullname}</Card.Header>
                                <Card.Meta>@{user.username}</Card.Meta>
                                <Card.Description as="h3">
                                    {post.text}
                                </Card.Description>
                            </Card.Content>

                            <Card.Content extra>
                                {hasLikedPost(post) ? (
                                    <Button
                                        onClick={() => unlikeHandler(post)}
                                        as="div"
                                        labelPosition="right"
                                    >
                                        <Button color="blue">
                                            <Icon name="heart" />
                                            Unlike
                                        </Button>
                                        <Label
                                            as="a"
                                            basic
                                            color="blue"
                                            pointing="left"
                                        >
                                            {post.likes.length}
                                        </Label>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => likeHandler(post)}
                                        as="div"
                                        labelPosition="right"
                                    >
                                        <Button color="red">
                                            <Icon name="heart" />
                                            Like
                                        </Button>
                                        <Label
                                            as="a"
                                            basic
                                            color="red"
                                            pointing="left"
                                        >
                                            {post.likes.length}
                                        </Label>
                                    </Button>
                                )}
                            </Card.Content>

                            <Card.Content>
                                <Comment.Group>
                                    <Header as="h4" dividing>
                                        Comments (
                                        {post.comments.length === 0
                                            ? "No comments yet"
                                            : post.comments.length}
                                        )
                                    </Header>

                                    {post.comments.map((com) => (
                                        <Comment>
                                            <Comment.Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" />
                                            <Comment.Content>
                                                <Comment.Author>
                                                    {com.user.fullname}
                                                </Comment.Author>
                                                <Comment.Metadata>
                                                    at{" "}
                                                    {new Date(
                                                        com.created_at
                                                    ).toLocaleString()}
                                                </Comment.Metadata>
                                                <Comment.Text>
                                                    {com.comment}
                                                </Comment.Text>
                                            </Comment.Content>
                                        </Comment>
                                    ))}

                                    <div style={{ width: "100% !important" }}>
                                        <Input
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            icon={
                                                <Icon
                                                    name="comment"
                                                    inverted
                                                    circular
                                                    link
                                                    onClick={() =>
                                                        sendCommentHandler(post)
                                                    }
                                                />
                                            }
                                            placeholder="Add comment..."
                                        />
                                    </div>
                                </Comment.Group>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <h4>No posts yet</h4>
                )}
            </div>
        </>
    );
};

export default Profile;
