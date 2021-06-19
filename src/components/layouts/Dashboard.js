import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../PokemonList";
import Pagination from "../Pagination";

const Dashboard = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setPokemon(res.data.results);
      });

    return () => cancel();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        goToNextPage={nextPageUrl ? goToNextPage : null}
      />
    </>
  );
};

export default Dashboard;
