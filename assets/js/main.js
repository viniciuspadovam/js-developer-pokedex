const pokemonListHtml = document.querySelector('#pokemonList');
const loadMoreButton = document.querySelector('#loadMoreButton');

const maxRecords = 151;
let offset = 0;
const limit = 10; 

function convertPokemonToHtml(pokemon) {
   return `
      <a href="./details.html?id=${pokemon.number}">
      <li class="pokemon ${pokemon.mainType}">
         <span class="number">#${pokemon.number}</span>
         <span class="name">${pokemon.name}</span>

         <div class="detail">
            <ol class="types">
               ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
         </div>
      </li>
      </a>
   `;
}

function loadPokemonItems(offset, limit) {
   
   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
         pokemonListHtml.innerHTML += pokemons.map(convertPokemonToHtml).join('');
   })
   .catch(err => console.error(err));
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
   offset += limit;

   const qtdRecordsNextPage = offset + limit;

   if(qtdRecordsNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
      return;
   }
   loadPokemonItems(offset, limit);
})
