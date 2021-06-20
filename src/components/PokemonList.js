import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { backgroundColors } from "../assets/colors";

const PokemonList = ({ allPokemons }) => {

  return (
    <PokemonListContainer>
      {allPokemons.map((p) => {

        return (
          <PokemonCard to={`pokemon/${p.id}`} style={{ backgroundColor: backgroundColors[p.types[0].type.name] }}>
            <span>
              #{p.id < 10 ? "0" : ""}
              {p.id < 100 ? "0" : ""}
              {p.id}
            </span>
            <PokemonImg
              src={`https://pokeres.bastionbot.org/images/pokemon/${p.id}.png`}
              alt={p.name}
            />
            <PokemonName>{p.name}</PokemonName>
          </PokemonCard>
        );
      })}
    </PokemonListContainer>
  );
};

export default PokemonList;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 15px;
  margin: 0 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: auto auto auto;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: auto auto;
  }
`;

const PokemonCard = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 10px;
`;

const PokemonImg = styled.img`
  width: 50px;
`;

const PokemonName = styled.h3`
  text-transform: capitalize;
`;
