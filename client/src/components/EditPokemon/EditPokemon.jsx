import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  editPokemon,
  getAllPokemons,
  getTypes,
} from "../../redux/actions";
import "./editPokemon.css"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const EditPokemon = () => {
  function validate(input) {
    const errors = {};
    if (
      !input.name ||
      input.name.length < 3 ||
      /[0-9]/.test(input.name) ||
      /[/_*@#%!&"?¿`+{},.:;()+-]/.test(input.name)
    ) {
      errors.name = "El nombre no debe contener caracteres especiales";
    }
    if (
      !input.hp ||
      input.hp < 0 ||
      input.hp > 150 ||
      /[/_*@#%!&"?¿`+{},.:;()+-]/.test(input.hp)
    ) {
      errors.hp = "Debe tener hp entre 1 - 150";
    }

    if (!input.attack || input.attack < 0 || input.attack > 150) {
      errors.attack = "Debe tener ataque entre 1 - 150";
    }

    if (!input.defense || input.defense < 0 || input.defense > 150) {
      errors.defense = "Debe tener defensa entre 1 - 150";
    }
    if (!input.speed || input.speed < 0 || input.speed > 150) {
      errors.speed = "Debe tener velocidad entre 1 - 150";
    }
    if (!input.weight || input.weight < 0 || input.weight > 500) {
      errors.weight = "Debe tener peso entre 1-500";
    }
    if (!input.height || input.height < 0 || input.height > 500) {
      errors.height = "Debe tener altura entre 1-500";
    }
    return errors;
  }
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const types = useSelector((state) => state.types);
  const history = useHistory();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  let editTypes = [];
  pokemonDetail.types.map((type) => {
    return editTypes.push(type.name);
  });
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  const [input, setInput] = useState({
    name: pokemonDetail.name,
    hp: pokemonDetail.hp,
    attack: pokemonDetail.attack,
    defense: pokemonDetail.defense,
    speed: pokemonDetail.speed,
    height: pokemonDetail.height,
    weight: pokemonDetail.weight,
    image: pokemonDetail.image,
    types: editTypes,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editPokemon(pokemonDetail.id, input));
    alert("El pokemon se ha editado con exito");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });
    history.push("/home");
    dispatch(getAllPokemons());
    window.location.reload();
  };
  const handleSelect = (event) => {
    if (!input.types.includes(event.target.value)) {
      setInput({
        ...input,
        types: [...input.types, event.target.value],
      });
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    let filterOfTypes = input.types.filter(
      (type) => type !== event.target.value
    );
    setInput({
      ...input,
      types: filterOfTypes,
    });
  };
  return (
    <>
      <div className="bodyForm">
        {" "}
        <div className="NavLinkContainer">
          <NavLink className="NavLinkForm" to="/home">
            Volver a Home
          </NavLink>
        </div>
        <div className="form">
          <div className="div-container">
            <div>
              <h3>Crea tu propio Pokemon</h3>
            </div>

            <div>
              <div>
                <div>
                  <div>
                    <div className="h2Form">Nombre</div>
                    <input
                      autoComplete="off"
                      className="inputItem"
                      value={input.name}
                      name="name"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      type="text"
                      placeholder="Nombre"
                    />{" "}
                    {errors.name && <div className="Errors">{errors.name}</div>}
                    <div className="h2Form">Hp</div>
                    <input
                      autoComplete="off"
                      className="inputItem"
                      value={input.hp}
                      name="hp"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      type="number"
                      placeholder="1-150"
                    />
                    {errors.hp && <div className="Errors">{errors.hp}</div>}
                  </div>
                  <div>
                    <div className="h2FormAttack">Attack</div>
                    <input
                      autoComplete="off"
                      className="inputItem"
                      value={input.attack}
                      name="attack"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      type="number"
                      placeholder="1-150"
                    />{" "}
                    {errors.attack && (
                      <div className="Errors">{errors.attack}</div>
                    )}
                    <div className="h2Form">Defense</div>
                    <input
                      autoComplete="off"
                      className="inputItem"
                      value={input.defense}
                      name="defense"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      type="number"
                      placeholder="1-150"
                    />
                    {errors.defense && (
                      <div className="Errors">{errors.defense}</div>
                    )}
                  </div>

                  <div className="h2FormSpeed">Speed</div>

                  <input
                    autoComplete="off"
                    className="inputItem"
                    value={input.speed}
                    name="speed"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    type="number"
                    placeholder="1-150"
                  />
                  {errors.speed && <div className="Errors">{errors.speed}</div>}

                  <div className="h2Form">Height</div>
                  <input
                    autoComplete="off"
                    className="inputItem"
                    value={input.height}
                    name="height"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    type="number"
                    placeholder="1-500"
                  />

                  {errors.height && (
                    <div className="Errors">{errors.height}</div>
                  )}
                </div>
                <div className="h2FormWeight">Weight</div>
                <input
                  autoComplete="off"
                  className="inputItem"
                  value={input.weight}
                  name="weight"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  type="number"
                  placeholder="Peso"
                />{" "}
                {errors.weight && <div className="Errors">{errors.weight}</div>}
                <div className="h2Form">Image</div>
                <input
                  autoComplete="off"
                  className="inputItem"
                  value={input.image}
                  name="image"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  type="text"
                  placeholder="Inserta tu url"
                />
              </div>
              <select
                className="select"
                disabled={input.types.length === 2}
                onChange={(e) => handleSelect(e)}
                name="types"
                defaultValue="title"
              >
                <option value="title" disabled name="Tipos">
                  Tipos
                </option>
                {types?.map((type) => {
                  return (
                    <option className="types" key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
              {input.types?.map((type) => {
                return (
                  <div key={type}>
                    <p className="pForm" key={type}>
                      {type}
                    </p>
                    <button
                      className="deleteButton"
                      value={type}
                      onClick={(event) => handleDelete(event)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
              <br />
              {errors.types && <div className="Errors">{errors.types}</div>}
              <br />
              <input
                type="submit"
                value="Editar"
               
                onClick={(event) => {
                  handleSubmit(event);
                }}
                className="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditPokemon;
