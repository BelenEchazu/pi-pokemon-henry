import style from "./SearchBar.module.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByType,
  filterCreated,
  getAllPokemons,
  getPokemonByName,
  getTypes,
  orderAlphabetically,
  orderByAttack,
} from "../../redux/actions";

//import Error from "../Error/Error.jsx";
export const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [selectTypes, setSelectTypes] = useState({ type: [], exist: [] });
  //const error = useSelector((state) => state.error);
  const types = useSelector((state) => state.types);
  const [input, setInput] = useState("");
  let selectDisabled = !!selectTypes.type.length;
  let selectDisabledExist = !!selectTypes.exist.length;

  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(getPokemonByName(input));
    setInput("");
  };

  const handleChangeByExisting = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    let value = event.target.value;
    if (value === "Todos") {
      dispatch(getAllPokemons());
    }
    if (value) dispatch(filterCreated(value));
    setSelectTypes({ ...selectTypes, exist: [value] });
  };

  const handleOrder = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    const value = event.target.value;
    if (value === "strong" || value === "weak") {
      dispatch(orderByAttack(value));
    }
    if (value === "AZ" || value === "ZA") {
      dispatch(orderAlphabetically(value));
    }
  };
  const reload = () => {
    window.location.reload();
  };

  const handleChangeByType = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    let value = event.target.value;
    if (value === "all") {
      dispatch(getAllPokemons());
    }
    dispatch(filterByType(value));
    setSelectTypes({...selectTypes, type: [value] });
  };

  const handleDeleteType = (event) => {
    event.preventDefault();
    setSelectTypes({
      type: [],
      exist: [],
    });
    window.location.reload();
    dispatch(getAllPokemons());
  };
  return (
    <>
      <div className={style.navContainer}>
        <button onClick={reload} className={style.refresh}>
          Home
        </button>
        <div>
          <input
            className={style.inputSearchBar}
            onChange={(event) => {
              handleChange(event);
            }}
            type="text"
            placeholder="Encuentra tu pokemon"
          />
          <button
            className={style.btnSearchBar}
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            Buscar
          </button>
        </div>

        <NavLink className={style.btnForm} to="/form">
          Crear
        </NavLink>
      </div>
      <div className={style.flexContainer}>
        <div>
          <select
            onChange={(event) => handleOrder(event)}
            defaultValue="title"
            className={style.inputHome}
          >
            <option value="title" disabled name="Alfabetico">
              Ordenar por
            </option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
            <option value="strong">Desde el mas fuerte</option>
            <option value="weak">Desde el mas debil</option>
          </select>
          <select disabled={selectDisabledExist}
            onChange={(event) => {
              handleChangeByExisting(event);
            }}
            defaultValue="title"
            className={style.inputHome}
          >
            <option value="Todos">Ordenar por todos</option>
            <option value="Existente">Ordenar por existente</option>
            <option value="Creado">Ordenar por creado</option>
          </select>
          {selectTypes.exist?.map((exist, index) => {
            return (
              <div className={style.selectTypes} key={index}>
                <p className={style.pForm} key={exist}>
                  {exist}
                </p>
                <button
                  className={style.buttonDelete}
                  onClick={(event) => handleDeleteType(event)}
                >
                  x
                </button>
              </div>
            );
          })}
          <select
            disabled={selectDisabled}
            onChange={(event) => handleChangeByType(event)}
            name="types"
            defaultValue="title"
            className={style.inputHome}
          >
            <option value="title" disabled name="Tipos">
              Filtrado por tipo
            </option>
            {types.map((type) => {
              return (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              );
            })}
          </select>
          {selectTypes.type?.map((type, index) => {
            return (
              <div className={style.selectTypes} key={index}>
                <p className={style.pForm} key={type}>
                  {type}
                </p>
                <button
                  className={style.buttonDelete}
                  onClick={(event) => handleDeleteType(event)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SearchBar;
