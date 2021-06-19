import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PokemonList = ({ pokemon }) => {
  return (
    <PokemonListContainer>
      {pokemon.map((p) => {
        const pokemonIndex = p.url.split("/")[p.url.split("/").length - 2];

        return (
          <PokemonCard to={`pokemon/${pokemonIndex}`}>
            <span>
              #{pokemonIndex < 10 ? "0" : ""}
              {pokemonIndex < 100 ? "0" : ""}
              {pokemonIndex}
            </span>
            <PokemonImg
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`}
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
  margin: 30px;
`;

const PokemonCard = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const PokemonImg = styled.img`
  width: 100px;
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
`;
