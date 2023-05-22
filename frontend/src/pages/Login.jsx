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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading, errorUser } = useAuth();

    const onLogin = () => {
        let data = {
            email,
            password,
        };
        login(data);
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
                    Log-in to your account
                </Header>
                {errorUser && <Message error content={errorUser} />}
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            onChange={(e) => setEmail(e.target.value)}
                            fluid
                            icon="user"
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
                            loading={loading}
                            color="blue"
                            fluid
                            size="large"
                            onClick={onLogin}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/register">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;
