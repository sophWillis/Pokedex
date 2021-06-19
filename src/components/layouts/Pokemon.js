import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${
          document.location.pathname.split("/")[
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
        console.log(pokemon);
      });

    return () => cancel();
  }, []);

  if (loading) return "Loading...";

  return (
    <>
      <h1>{pokemon.name}</h1>
    </>
  );
};

export default Pokemon;
