import React, { useState, useEffect } from "react";
import PokemonList from "../PokemonList";

const Dashboard = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [loading, setLoading] = useState(true);

  const getAllPokemons = async () => {
    setLoading(true);
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setLoading(false);
        setAllPokemons(currentList => [...currentList, data]);
      });
    }

    createPokemonObject(data.results);
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList allPokemons={allPokemons} />
      <button onClick={() => getAllPokemons()}>Load More</button>
    </>
  );
};

export default Dashboard;
