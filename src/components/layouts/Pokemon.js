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

  if (loading) return "Loading...";

  return (
    <PokemonContainer style={{ backgroundColor: backgroundColors[pokemon.types && pokemon.types[0] && pokemon.types[0].type && pokemon.types[0].type.name] }}>
      <h1>{pokemon.name}</h1>
    </PokemonContainer>
  );
};

export default Pokemon;

const PokemonContainer = styled.div`
  height: 100vh;
`;