import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import OopsImg from "../../assets/images/oops.png";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
    const emailRef = useRef(),
        passwordRef = useRef(),
        { login } = useAuth(),
        [error, setError] = useState(""),
        [loading, setLoading] = useState(false),
        history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    };

    return (
        <Card>
            <SignUpH1>Log In</SignUpH1>
            {error &&
                <Alert>
                    <img src={OopsImg} alt="Oops" />
                    <AlertBox>{error}</AlertBox>
                </Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="email" id="email" ref={emailRef} required />
                <Label>Password</Label>
                <Input type="password" id="password" ref={passwordRef} required />
                <Button disabled={loading} type="submit">Log In</Button>
            </Form>
            <LinkText><RouterLink to="/forgot-password">Forgot password?</RouterLink></LinkText>
            <LinkText>Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink></LinkText>
        </Card>
    )
}

export default Login;

const Card = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
`;

const SignUpH1 = styled.h1`
    margin-bottom: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;

    @media screen and (min-width: 480px) {
        width: 500px;
    }
`;

const Input = styled.input`
    margin-bottom: 15px;
    height: 40px;
    width: 100%;
    border: none;
    outline: none;
    background-color: #eee;
    border-radius: 5px;
    padding: 0 15px;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const Button = styled.button`
    outline: none;
    border: none;
    width: 100%;
    height: 40px;
    background-color: #fb1a18;
    color: white;
    margin: 15px 0 30px;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 5px;
`;

const Alert = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img {
        width: 100px;
        margin-bottom: 30px;
    }
`;

const AlertBox = styled.div`
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    color: #a94442;
    margin-bottom: 30px;
    padding: 15px;
    border-radius: 5px;
    font-weight: 400;
    width: 100%;
    font-size: .875rem;
`;

const LinkText = styled.div`
    margin-bottom: 5px;
`;

const RouterLink = styled(Link)`
    text-decoration: none;
    color: #fb1a18;

    :hover {
        text-decoration: underline;
    }
`;
