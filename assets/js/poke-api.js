const pokeApi = {};

/**
 * Convert the return of the fetch request into a pokemon class instance.
 * 
 * @param {JSON} pokemonDetails
 * @returns 
 */
function convertPokemonDetailsToPokemon(pokemonDetails) {
   const pokemon = new Pokemon();
   pokemon.name = pokemonDetails.name;
   pokemon.number = pokemonDetails.id;

   const types = pokemonDetails.types.map(types => types.type.name);
   const [ type ] = types;

   pokemon.mainType = type;
   pokemon.types = types;
   pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;

   return pokemon
}

/**
 * Convert the return of the fetch request into a pokemon class instance.
 * 
 * @param {JSON} pokemonDetails
 * @returns 
 */
function convertPokemonByIdToPokemon(pokemonDetails) {
   const pokemon = new Pokemon();
   pokemon.name = pokemonDetails.name;
   pokemon.number = pokemonDetails.id;

   const types = pokemonDetails.types.map(types => types.type.name);
   const [ type ] = types;

   pokemon.mainType = type;
   pokemon.types = types;
   pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;
   pokemon.baseExperience = pokemonDetails.base_experience;
   pokemon.height = pokemonDetails.height;
   pokemon.weight = pokemonDetails.weight;
   
   const stats = pokemonDetails.stats.map(stats => {
      return {
         "name": stats.stat.name,
         "number": stats.base_stat
      };
   });

   pokemon.stats = stats;

   return pokemon
}

pokeApi.getPokemonDetails = (pokemons) => {
   return fetch(pokemons.url)
      .then((response) => response.json())
      .then(convertPokemonDetailsToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

   return fetch(url)
      .then(res => res.json()) // Convert response to JSON object
      .then(responseBody => responseBody.results) // returns name and url of the pokemons
      .then(pokemons => pokemons.map(pokeApi.getPokemonDetails)) // Get the pokemons one a one with map and return a list of Promises
      .then(detailRequest => Promise.all(detailRequest)) // Does the requests to get all the pokemons details to fill the class and return information needed
      .then(pokemonDetails => pokemonDetails); // return only the information that front will use display the pokedex
};

pokeApi.getPokemonById = (id) => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`

   return fetch(url)
      .then(res => res.json())
      .then(responseBody => convertPokemonByIdToPokemon(responseBody))
      .then(pokemonDetails => pokemonDetails);
};