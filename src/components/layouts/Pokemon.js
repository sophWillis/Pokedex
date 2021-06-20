import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { backgroundColors } from "../../assets/colors";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <PokemonContainer style={{ backgroundColor: backgroundColors[pokemon.types && pokemon.types[0] && pokemon.types[0].type && pokemon.types[0].type.name] }}>
      <PokeballLoader loading={loading}>
        <div></div>
      </PokeballLoader>
      <h1>{pokemon.name}</h1>
    </PokemonContainer>
  );
};

export default Pokemon;

const PokemonContainer = styled.div`
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokeballLoader = styled.div`
  display: ${({ loading }) => (loading ? "block" : "none")};
  position: relative;
  background-color: white;
  width: 100px;
  height: 100px;
  border: 5px solid;
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
    background-color: black;
  }

  div {
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
    }

  @keyframes blink {
    from { background: #eee;}
    to { background: #e74c3c; }
  }
`;
