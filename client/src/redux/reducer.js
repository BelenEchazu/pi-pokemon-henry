import {
  GET_ALL_POKEMONS,
  CREATE_POKEMON,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  FILTER_CREATED,
  ORDER_ALPHABETICALLY,
  ORDER_BY_ATTACK,
  FILTER_BY_TYPE,
  ERROR,
} from "./actions";
// Importa las actions types que necesites acá:

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: [],
  error: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_ALL_POKEMONS:
      if (!action.payload.includes(null)) {
        return {
          ...state,
          pokemons: action.payload,
        };
      } else {
        return {
          ...state,
          error: true,
        };
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return { ...state, pokemonDetail: action.payload };

    case GET_POKEMON_BY_NAME:
      if (!action.payload.includes(null)) {
        return {
          ...state,
          pokemons: action.payload,
        };
      } else {
        return { ...state, error: true };
      }

    case FILTER_CREATED:
      const array = [...state.pokemons];
      let FilterPokemons;
      if (action.payload === "Creado") {
        FilterPokemons = array.filter((pokemon) => {
          return pokemon.createdInDb;
        });
        if (!FilterPokemons.length) {
          return {
            ...state,
            error:
              FilterPokemons.length > 0
                ? false
                : ` No se ha creado ningun pokemon`,
          };
        }
      } else {
        FilterPokemons = array.filter((pokemon) => {
          return !pokemon.createdInDb;
        });
      }
      return {
        ...state,
        pokemons: FilterPokemons,
      };
    case ORDER_ALPHABETICALLY:
      const arrayAlfabetico = [...state.pokemons];
      const FiltradosAlfabeticamente =
        action.payload === "AZ"
          ? arrayAlfabetico.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : arrayAlfabetico.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: FiltradosAlfabeticamente,
      };
    case ORDER_BY_ATTACK:
      const allPoke = [...state.pokemons];
      const sortedPokemonAttack =
        action.payload === "strong"
          ? allPoke.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : allPoke.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        error: false,
        pokemons: sortedPokemonAttack,
      };

    case FILTER_BY_TYPE:
      const allPokemonsFT = [...state.pokemons];
      let pokemonByType = [];
      // eslint-disable-next-line no-unused-vars
      const idType =
        action.payload === "all"
          ? allPokemonsFT
          : allPokemonsFT.forEach((pokemon) =>
              pokemon.types.forEach((types) =>
                types.name === action.payload
                  ? pokemonByType.push(pokemon)
                  : false
              )
            );
      return {
        ...state,
        pokemons: pokemonByType,
        error:
          pokemonByType.length > 0
            ? false
            : ` No hay ningun pokemon con el type ${action.payload}`,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case CREATE_POKEMON:
      return { ...state };

    default:
      return { ...state };
  }
};

export default rootReducer;
