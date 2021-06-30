import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";
import { backgroundColors } from "../../assets/colors";
import { Link } from "react-router-dom";
import logic from "../../logic";

const Home = () => {
  const [pokemon, setPokemon] = useState(""),
    [allPokemons, setAllPokemons] = useState([]),
    [pokemonData, setPokemonData] = useState([]),
    [error, setError] = useState(""),
    [hidden, setHidden] = useState(false),
    [loading, setLoading] = useState(true),
    [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon"),
    [species, setSpecies] = useState([]);

  const getBgText = async (results) => {
    let promises = [];

    results.forEach((pokemon) => {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`).then(
          (res) => res.json()
        )
      );
    });

    await Promise.all(promises).then((data) => {
      setSpecies([...species, ...data]);
    });
  };

  const createPokemonObject = async (results) => {
    let promises = [];

    results.forEach((pokemon) => {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((res) =>
          res.json()
        )
      );
    });

    await Promise.all(promises).then((data) => {
      setLoading(false);
      setAllPokemons([...allPokemons, ...data]);
    });
  };

  const getAllPokemons = () => {
    setLoading(true);
    fetch(loadMore)
      .then((res) => res.json())
      .then((res) => {
        setLoadMore(res.next);
        createPokemonObject(res.results);
        getBgText(res.results);
      });
  };

  const getPokemonByName = () => {
    const toArray = [];
    setLoading(true);

    logic
      .getPokemonByName(pokemon)
      .then((res) => {
        res.id && toArray.push(res);
        setLoading(false);
        setPokemonData(toArray);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError("Pokémon not found");
      });
  };

  useEffect(() => {
    getPokemonByName();
    getAllPokemons();
  }, []);

  const handleChange = (e) => {
    setPokemonData([]);
    setError("");
    setPokemon(e.target.value.toLowerCase());

    if (e.target.value === "") {
      setHidden(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHidden(true);
    getPokemonByName();
  };

  return (
    <HomeContainer>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Search" onChange={handleChange} />
        <SearchIcon />
      </Form>
      <PokeballLoader loading={loading}>
        <div></div>
      </PokeballLoader>
      {error && <AlertBox>{error}</AlertBox>}
      <PokemonListContainer>
        {allPokemons.map((item, index) => (
          <PokemonCard
            key={index}
            to={`pokemon/${item.id}`}
            style={{
              backgroundColor: `${
                backgroundColors[item.types && item.types[0]?.type?.name]
              }`,
            }}
            hidden={hidden}
          >
            {species.map((speciesItem, index) =>
              speciesItem.name === item.name ? (
                <BgText key={index}>
                  {speciesItem.names && speciesItem.names[0].name}
                </BgText>
              ) : (
                ""
              )
            )}
            <PokemonImg
              src={item.sprites?.other["official-artwork"]?.front_default}
              alt={item.name}
            />
            <PokemonText>
              <PokemonName>{item.name}</PokemonName>
              <PokemonTypes>
                {item.types?.map((item, index) => (
                  <Type
                    key={index}
                    style={{
                      backgroundColor: backgroundColors[item.type.name],
                    }}
                  >
                    {item.type?.name}
                  </Type>
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
      </PokemonListContainer>
      {pokemonData?.map((item, index) => (
        <PokemonCard
          key={index}
          to={`pokemon/${item.id}`}
          style={{
            backgroundColor: `${
              backgroundColors[item.types && item.types[0]?.type?.name]
            }`,
          }}
        >
          {species.map((speciesItem, index) =>
            speciesItem.name === item.name ? (
              <BgText key={index}>
                {speciesItem.names && speciesItem.names[0].name}
              </BgText>
            ) : (
              ""
            )
          )}
          <PokemonImg
            src={item.sprites?.other["official-artwork"]?.front_default}
            alt={item.name}
          />
          <PokemonText>
            <PokemonName>{item.name}</PokemonName>
            <PokemonTypes>
              {item.types?.map((item, index) => (
                <Type
                  key={index}
                  style={{ backgroundColor: backgroundColors[item.type?.name] }}
                >
                  {item.type?.name}
                </Type>
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
      <LoadMore
        onClick={() => getAllPokemons()}
        loading={loading}
        hidden={hidden}
      >
        Load More
      </LoadMore>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  padding-top: 80px;
  padding: 80px 20px 20px;
`;

const Form = styled.form`
  position: relative;
`;

const SearchIcon = styled(IoSearchSharp)`
  position: absolute;
  left: 20px;
  height: 40px;
  font-size: 1rem;
  color: rgba(0, 0, 0, 50%);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  background-color: #eee;
  border-radius: 30px;
  margin-bottom: 20px;
  font-size: 1rem;
  padding: 0 45px;
  outline: none;
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
    animation: blink 0.5s alternate infinite;
  }

  @keyframes blink {
    from {
      background: #eee;
    }
    to {
      background: #e74c3c;
    }
  }
`;

const PokemonListContainer = styled.div`
  display: "grid";
  grid-template-columns: auto auto auto auto;
  grid-gap: 15px;

  @media screen and (max-width: 1600px) {
    grid-template-columns: auto auto auto;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 768px) {
    display: "block";
  }
`;

const PokemonCard = styled(Link)`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  position: relative;
  text-decoration: none;
  color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
`;

const BgText = styled.h1`
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, 0.2);
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
  font-size: 0.75rem;
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
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const AlertBox = styled.div`
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  color: #a94442;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
  font-weight: 400;
  width: 100%;
  font-size: 0.875rem;
`;

const LoadMore = styled.button`
  display: ${({ loading, hidden }) => (loading || hidden ? "none" : "block")};
  margin: 0 auto;
  padding: 10px 15px;
  border: none;
`;
