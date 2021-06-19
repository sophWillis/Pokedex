import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <NavLogo>Pokedex</NavLogo>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding-left: 30px;
  height: 80px;
`;

const NavLogo = styled.p`
  font-size: 1.4rem;
  font-family: "Signika", sans-serif;
`;
