import React from "react";
import styled from "styled-components";

const Dropdown = ({ isOpen }) => {
    return (
        <DropdownContainer isOpen={isOpen}>
            <NavLink>Favourites</NavLink>
            <NavLink>Login</NavLink>
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

const NavLink = styled.div``;
