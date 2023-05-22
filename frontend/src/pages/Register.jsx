import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from "semantic-ui-react";
import { useAuth } from "../services/auth";

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register, loading, errorUser } = useAuth();

    const onRegister = () => {
        let data = {
            fullname,
            username,
            email,
            password,
        };
        register(data);
    };

    return (
        <Grid
            className="animated fadeInDown"
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="blue" textAlign="center">
                    Create an account
                </Header>
                {errorUser && <Message error content={errorUser} />}
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            onChange={(e) => setFullname(e.target.value)}
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Full name"
                        />
                        <Form.Input
                            onChange={(e) => setUsername(e.target.value)}
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                        />
                        <Form.Input
                            onChange={(e) => setEmail(e.target.value)}
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="E-mail address"
                        />
                        <Form.Input
                            onChange={(e) => setPassword(e.target.value)}
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />

                        <Button
                            color="blue"
                            loading={loading}
                            fluid
                            onClick={onRegister}
                            size="large"
                        >
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <Link to="/login">Sign In</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Register;
