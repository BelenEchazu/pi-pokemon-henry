import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import style from "./Home.module.css";
import { NavLink } from "react-router-dom";
import { getAllPokemons } from "../../redux/actions.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pokemon } from "../Pokemon/Pokemon.jsx";
import Error from "../Error/Error.jsx";
import Paginado from "../Paginado/Paginado.jsx";


export const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const error = useSelector((state) => state.error);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPokemons());

  }, [dispatch]);
  if (error) {
    return <Error />;
  }
  if (allPokemons.length) {
    return (
      <>
        <div className={style.bodyHome}>
          <SearchBar setCurrentPage={setCurrentPage} />
          <div>
            {currentPokemons.map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                  weight={pokemon.weight}
                  height={pokemon.height}
                />
              );
            })}
          </div>
          <Paginado
            currentPage={currentPage}
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
          <NavLink className={style.NavLinkToLanding} to="/">
            Volver a inicio
          </NavLink>
        </div>
      </>
    );
  } else {
    return (
      <div className={style.loadingContainer}>
        <div className={style.container}>
          <div>
            <h1 className={style.title}>Loading...</h1>
          </div>
          <div className={style.loadingImgContainer}>
            <img
              src="https://i.gifer.com/origin/06/068c8f36ce4e0216bcc86ccc2e2401a0.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
};
export default Home;
