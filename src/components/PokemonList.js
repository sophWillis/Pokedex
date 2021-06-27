import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { backgroundColors } from "../assets/colors";

const PokemonList = ({ allPokemons }) => {
  return (
    <PokemonListContainer>
      {allPokemons.map((item, index) => (
        <PokemonCard key={index} to={`pokemon/${item.id}`} style={{ backgroundColor: `${backgroundColors[item.types[0].type.name]}` }}>
          <BgText>フシギダネ</BgText>
          <PokemonImg
            src={`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`}
            alt={item.name}
          />
          <PokemonText>
            <PokemonName>{item.name}</PokemonName>
            <PokemonTypes>
              {item.types.map((item, index) => (
                <Type key={index} style={{ backgroundColor: backgroundColors[item.type.name] }}>{item.type.name}</Type>
              ))}
            </PokemonTypes>
          </PokemonText>
          <PokemonId>
            #{item.id < 10 ? "0" : ""}
            {item.id < 100 ? "0" : ""}
            {item.id}
          </PokemonId>
        </PokemonCard>
      ))}
    </PokemonListContainer >
  );
};

export default PokemonList;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 15px;

  @media screen and (max-width: 1600px) {
    grid-template-columns: auto auto auto;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const PokemonCard = styled(Link)`
  position: relative;
  text-decoration: none;
  color: white;
  display: flex;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
`;

const BgText = styled.h1`
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, .2);
  font-size: 3.5rem;
  width: 100%;
  text-align: center;
`;

const PokemonImg = styled.img`
  width: 80px;
  margin-right: 15px;
`;

const PokemonText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
  font-size: 1.7rem;
`;

const PokemonId = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-weight: 700;
`;

const PokemonTypes = styled.div``;

const Type = styled.div`
  display: inline-block;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: .75rem;
  text-transform: capitalize;
  position: relative;
  font-weight: 600;

  :first-child:before {
    content: "";
    position: absolute;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .1);
  }
`;
