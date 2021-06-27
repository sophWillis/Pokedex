import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Favourites = () => {
    const { currentUser } = useAuth();

    return (
        <FavouritesContainer>
            <h1>Favourites</h1>
            {!currentUser &&
                <AlertBox>
                    <p><Link to="/login">Log in</Link> to view your favourites!</p>
                    <p>If you don't have an account yet, what are you waiting for? <Link to="/signup">Sign up!</Link></p>
                </AlertBox>}
        </FavouritesContainer>
    )
}

export default Favourites;

const FavouritesContainer = styled.div`
    height: 100vh;
    padding: 100px 20px 0;
    display: flex;
    flex-direction: column;

    h1 {
        margin-bottom: 15px;
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
