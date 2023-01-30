import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON ";
export const ERROR = "ERROR";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons");
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: "No se han cargado los pokemons",
      });
    }
  };
}

export function setError(payload) {
  return {
    type: ERROR,
    payload,
  };
}
export function editPokemon(id, params) {
  return async function () {
    const edited = await axios.put(`/edit/${id}`, params);
    return edited;
  };
}

export function deletePokemon(id) {
  return async function () {
    const deleted = await axios.delete(`/delete/${id}`);
    return deleted;
  };
}
export function getPokemonById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: GET_POKEMON_BY_ID,
        payload: json.data.pop(),
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: "No se ha encontrado el pokemon con ese id",
      });
    }
  };
}

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `/pokemons?name=${name}`
      );
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: "No existe el pokemon con ese nombre",
      });
    }
  };
};

export function createPokemon(data) {
  return async function (dispatch) {
    const json = await axios.post("/pokemons", data);
    return json;
  };
}

export function getTypes() {
  return async function (dispatch) {
    const json = await axios.get("/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function orderAlphabetically(payload) {
  return {
    type: ORDER_ALPHABETICALLY,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}
