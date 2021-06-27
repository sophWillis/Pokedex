import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { backgroundColors } from "../../assets/colors";
import Heart from "react-animated-heart";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({}),
    [loading, setLoading] = useState(true),
    [bgText, setBgText] = useState(""),
    [isClick, setClick] = useState(false);

  const getBgText = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then(res => res.json())
      .then(res => setBgText(res.names[0].name));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation()]);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${document.location.pathname.split("/")[
        document.location.pathname.split("/").length - 1
        ]
        }`,
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      )
      .then((res) => {
        setLoading(false);
        setPokemon(res.data);
      });

    return () => cancel();
  }, []);

  return pokemon && (
    <PokemonContainer style={{ backgroundColor: backgroundColors[pokemon.types && pokemon.types[0] && pokemon.types[0].type && pokemon.types[0].type.name] }}>
      <PokeballLoader loading={loading}>
        <PokeballBlinker></PokeballBlinker>
      </PokeballLoader>
      <PokemonDisplay>
        <PokemonName>{pokemon.name}</PokemonName>
        <BgText getBgText={getBgText(pokemon.name)}>{bgText}</BgText>
        <PokemonImg src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={pokemon.name} />
        <PokemonId>
          #{pokemon.id < 10 ? "0" : ""}
          {pokemon.id < 100 ? "0" : ""}
          {pokemon.id}
        </PokemonId>
      </PokemonDisplay>
      <PokemonStatsCard>
      </PokemonStatsCard>
      <HeartButton>
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
      </HeartButton>
    </PokemonContainer>
  );
};

export default Pokemon;

const PokemonContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PokeballLoader = styled.div`
  display: ${({ loading }) => (loading ? "block" : "none")};
  height: 100vh;
  position: absolute;
  background-color: white;
  width: 100px;
  height: 100px;
  border: 5px solid #000;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: inset -5px 5px 0 5px #ccc;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    background-color: red;
    width: 100%;
    height: 50%;
  }

  &::after {
    top: calc(50% - 5px);
    width: 100%;
    height: 10px;
    background-color: #000;
  }
`;

const PokeballBlinker = styled.div`
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  width: 30px;
  height: 30px;
  background: #7f8c8d;
  border: 5px solid #fff;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 5px black;
  animation: blink .5s alternate infinite;

  @keyframes blink {
    from { background: #eee;}
    to { background: #e74c3c; }
  }
`;

const BgText = styled.h1`
  color: rgba(255, 255, 255, .5);
  font-size: 4rem;
  text-align: center;
`;

const PokemonDisplay = styled.div`
  margin-bottom: 80px;
`;

const PokemonName = styled.h1`
  font-weight: 800;
  font-size: 50px;
  text-align: center;
  text-transform: capitalize;
  color: rgba(255, 255, 255, .5);
`;

const PokemonImg = styled.img`
  width: 300px;
`;

const PokemonId = styled.div`
  text-align: right;
  font-weight: 700;
  font-size: 40px;
  color: rgba(255, 255, 255, .5);
`;

const PokemonStatsCard = styled.div`
  position: absolute;
  top: 80vh;
  height: 100vh;
  width: 100%;
  border-radius: 35px 35px 0 0;
  background-color: #fff;
`;

const HeartButton = styled.div`
  position: fixed;
  bottom: 0;
  align-self: flex-end;
  -webkit-tap-highlight-color: transparent;
`;
