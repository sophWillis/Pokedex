import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/images/logo.png"
import PokeballImg from "../../assets/images/user-icon.png";
import { CgChevronLeft } from "react-icons/cg";

const Navbar = ({ toggleDropdown }) => {
  return (
    <Nav>
      <NavLogoLink to="/" >
        <NavBackArrow />
      </NavLogoLink>
      <NavLogoLink to="/" >
        <NavLogo src={LogoImg} alt="Pokédex Logo" />
      </NavLogoLink>
      <NavPokeball
        src={PokeballImg} alt="Pokéball Icon"
        onClick={toggleDropdown}
      />
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: transparent;
  z-index: 1;
  padding: 0 15px;
`;

const NavLogoLink = styled(Link)``;

const NavLogo = styled.img`
  height: 40px;
`;

const NavBackArrow = styled(CgChevronLeft)`
  font-size: 30px;
  color: #fafafa;
  vertical-align: middle;
`;

const NavPokeball = styled.img`
  height: 30px;
  cursor: pointer;

  :hover {
    animation: bounce 1s;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-6px);}
    60% {transform: translateY(-3px);}
  }
`;
