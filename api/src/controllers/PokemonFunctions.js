const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const url = "https://pokeapi.co/api/v2/pokemon?limit=40";
let arrayPokemons = [];
let getInfoPokemons = async () => {
  try {
    let pokemonsFromApi = await axios.get(url);
    console.log(pokemonsFromApi.data.results)
    arrayPokemons = await Promise.all(
      pokemonsFromApi.data.results.map(async (pokemon) => {
        let infoDePokemon = await axios.get(pokemon.url);
        function Types() {
          let array = [];
          infoDePokemon.data.types.forEach((t) =>
            array.push({ name: t.type.name })
          );
          return array;
        }

        return {
          id: infoDePokemon.data.id,
          name: infoDePokemon.data.name,
          hp: infoDePokemon.data.stats[0].base_stat,
          attack: infoDePokemon.data.stats[1].base_stat,
          defense: infoDePokemon.data.stats[2].base_stat,
          speed: infoDePokemon.data.stats[5].base_stat,
          height: infoDePokemon.data.height,
          weight: infoDePokemon.data.weight,
          image: infoDePokemon.data.sprites.other.dream_world.front_default,
          types: Types(),
        };
        })
    );
    let pokemonDb = await Pokemon.findAll({
      include: Type,
    });
    arrayPokemons.push(...pokemonDb);
    return arrayPokemons;
  } catch (error) {
    error.message;
  }
};


// let getInfoPokemons = async () => {
//   try {
//     let arrayPokemons= await Pokemon.findAll({include: Type});
//     console.log("ARRAY", arrayPokemons)
//     if (arrayPokemons.length !== 0) {
//       return arrayPokemons
//     }
//     let pokemonsFromApi = await axios.get(url);

//     arrayPokemons = await Promise.all(
//       pokemonsFromApi.data.results.map(async (pokemon) => {
//         let infoDePokemon = await axios.get(pokemon.url);
//         function Types() {
//           let array = [];
//           infoDePokemon.data.types.forEach((t) =>
//             array.push({ name: t.type.name, id: t.type.id })
//           );
//           return array;
//         }

//         return {
//           name: infoDePokemon.data.name,
//           hp: infoDePokemon.data.stats[0].base_stat,
//           attack: infoDePokemon.data.stats[1].base_stat,
//           defense: infoDePokemon.data.stats[2].base_stat,
//           speed: infoDePokemon.data.stats[5].base_stat,
//           height: infoDePokemon.data.height,
//           weight: infoDePokemon.data.weight,
//           image: infoDePokemon.data.sprites.other.dream_world.front_default,
//           types: Types(),
//         };
//       })
//     );
//   Pokemon.bulkCreate(arrayPokemons);
//     let pokemonDb = await Pokemon.findAll({
//       include: Type,
//     });
//     arrayPokemons.push(...pokemonDb);
//     return arrayPokemons;
//   } catch (error) {
//     error.message;
//   }
// };



let getPokemonTypes = async () => {
  
  try {
    let arrayOfTypes = await Type.findAll();
    if (arrayOfTypes.length !== 0) {
      return arrayOfTypes;
    }

    let pokemonTypes = await axios.get("https://pokeapi.co/api/v2/type");
    arrayOfTypes = pokemonTypes.data.results.map((type) => ({name: type.name, id: type.id}));

    Type.bulkCreate(arrayOfTypes)

    return await Type.findAll();
  } catch (error) {
    return "No se a podido cargar los types";
  }

  
};
let getPokemonDetail = async (name) => {
  await getInfoPokemons();
  let pokemon = [];
  if (name) {
    name = name.toLowerCase();
    pokemon = arrayPokemons.filter((poke) => poke.name === name);
    if (pokemon.length > 0) {
      return pokemon;
    } else {
      throw new Error("No se encontro el pokemon solicitado");
    }
  } else {
    throw new Error("Se requiere un nombre para buscar un pokemon");
  }
};
let getPokemonDetailById = async (id) => {
  await getInfoPokemons();
  let pokemon = [];
  if (id.length <= 4) {
    id = parseInt(id);
  }
  if (id) {
    pokemon = arrayPokemons.filter((poke) => poke.id === id);
    if (pokemon.length > 0) {
      return pokemon;
    } else {
      throw new Error("No se encontro el pokemon solicitado");
    }
  } else {
    throw new Error("Se requiere un id para buscar un pokemon");
  }
};

let createPokemon = async (parametros) => { 
  await getPokemonTypes();
  console.log(parametros.name)
  const { name, types } = parametros;
  if (parametros.image === "") {
    parametros.image =
      "https://i.pinimg.com/originals/23/0c/68/230c68295a086b46a3bd01d03bef7719.gif";
  }
  if (name === undefined || name === null) {
    throw new Error("Faltan datos necesarios para crear el pokemon");
  } else {
    parametros.name = parametros.name.toLowerCase();
    const newPokemon = await Pokemon.create(parametros);
    if (types) {
      types.forEach(async (type) => {
        let responseFromDB = await Type.findAll();
        responseFromDB.find((element) =>
          element.name == type ? newPokemon.addTypes(element.id) : false
        );
      });
    }
    return `El pokemon ${name} ha sido creado`;
  }
};

let editPokemon = async (id, parametros) => {
  const { name, types } = parametros;
  if (parametros.image === "") {
    parametros.image =
      "https://i.pinimg.com/originals/23/0c/68/230c68295a086b46a3bd01d03bef7719.gif";
  }
  if (!name) {
    throw new Error("Faltan datos necesarios para editar el pokemon");
  } else {
    parametros.name = parametros.name.toLowerCase();
    const editPokemon = await Pokemon.findByPk(id);
    await editPokemon.update(parametros, {
      where: {
        id: id,
      },
    });
    const typesDb = await Type.findAll({
      where: {
        name: types,
      },
    });
    await editPokemon.setTypes(typesDb);
    return `El pokemon ${name} ha sido editado`;
  }
};

module.exports = {
  getInfoPokemons,
  getPokemonDetail,
  getPokemonDetailById,
  createPokemon,
  getPokemonTypes,
  editPokemon,
};
