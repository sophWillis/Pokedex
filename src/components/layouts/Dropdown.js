import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Dropdown = ({ isOpen }) => {
    const [error, setError] = useState(""),
        { currentUser, logout } = useAuth(),
        history = useHistory();

    const handleLogout = async () => {
        setError("");

        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out")
        }
    };

    return (
        <DropdownContainer isOpen={isOpen}>
            {currentUser?.email}
            {error && <AlertBox>{error}</AlertBox>}
            <DropdownLink to="/favourites">Favourites</DropdownLink>
            {!currentUser &&
                <>
                    <DropdownLink to="/signup">Sign Up</DropdownLink>
                    <DropdownLink to="/login">Log In</DropdownLink>
                </>
            }
            {currentUser && <DropdownLink onClick={handleLogout}>Log Out</DropdownLink>}
        </DropdownContainer>
    )
}

export default Dropdown;

const DropdownContainer = styled.div`
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    position: absolute;
    top: 80px;
    right: 0;
    width: 50%;
    padding: 8px 0;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const DropdownLink = styled(Link)``;

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
