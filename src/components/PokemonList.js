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
