import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
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

  return (
    <>
      <Navbar />
      <PokemonList allPokemons={allPokemons} />
      <LoadMore onClick={() => getAllPokemons()} loading={loading}>Load More</LoadMore>
      <PokeballLoader loading={loading}>
        <div></div>
      </PokeballLoader>
    </>
  );
};

export default Dashboard;

const LoadMore = styled.button`
  display: ${({ loading }) => (loading ? "none" : "block")};
  margin: 20px auto;
  padding: 10px 15px;
  border: none;
`;

const PokeballLoader = styled.div`
  display: ${({ loading }) => (loading ? "block" : "none")};
  position: relative;
  margin: 20px auto;
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
