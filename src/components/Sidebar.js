import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaTimes } from "react-icons/fa";
import OopsImg from "../assets/images/oops.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
        <SidebarContainer isOpen={isOpen}>
            <Nav>
                <CloseIcon onClick={toggleSidebar} />
            </Nav>
            {currentUser &&
                <ProfileInfo>
                    <ProfileImg src={OopsImg} />
                    <div>
                        <h1>Welcome Trainer!</h1>
                        <p>{currentUser.email}</p>
                    </div>
                </ProfileInfo>
            }
            {error && <AlertBox>{error}</AlertBox>}
            <SidebarMenuContainer onClick={toggleSidebar}>
                <SidebarLinks>
                    <SidebarLink to="/favourites">Favourites</SidebarLink>
                    {!currentUser &&
                        <>
                            <SidebarLink to="/signup">Sign Up</SidebarLink>
                            <SidebarLink to="/login">Log In</SidebarLink>
                        </>
                    }
                    {currentUser && <SidebarLink onClick={handleLogout}>Log Out</SidebarLink>}
                </SidebarLinks>
            </SidebarMenuContainer>
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.aside`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    z-index: 1;
    width: 100vw;
    background-color: #fff;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    padding: 0 20px 40px;
`;

const Nav = styled.nav`
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

const CloseIcon = styled(FaTimes)`
    font-size: 1.5rem;
`;

const SidebarMenuContainer = styled.div`
    width: 100%;
`;

const SidebarLinks = styled.div`
    line-height: 2;
`;

const SidebarLink = styled(Link)`
    color: #fb1a18;
    text-decoration: none;
    display: flex;
    justify-content: center;
    font-size: 1.125rem;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;

const ProfileInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        font-size: 1.25rem;
    }
`;

const ProfileImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #fb1a18;
    margin-right: 10px;
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
