const pokemonBg = document.querySelector('#pokemonContent');
const containerDetails = document.querySelector('.container-details');
const header = document.querySelector('.header');

const url = window.location;
const getNumbersFromUrlParam = [... url.search.matchAll(/[0-9]/g)];
const idParam = getNumbersFromUrlParam.map(item => item[0]).join('');

function uppercaseFirstLetter(str) {
   return str[0].toUpperCase() + str.substring(1);
}

function replaceHyphenAndUppercaseFirstLetter(str) {
   return uppercaseFirstLetter(str).replace('-', ' ');
}

function convertPokemonDetailsToHtmlHeader(pokemon) {
   return `
      <h1>${uppercaseFirstLetter(pokemon.name)}</h1>
      <span class="number">#${pokemon.number}</span>
      <ol class="types">
         ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
   `;
}

function convertPokemonDetailsToHtmlContent(pokemon) {
   const randomNumber = Math.floor(Math.random() * pokemon.baseExperience);

   return `
      <img class="pokemon-img"
         src="${pokemon.photo}"
         alt="${pokemon.name}">
      <div class="content-details">
         <div class="exp-container">
            <span class="exp-text">exp ${randomNumber}/${pokemon.baseExperience}</span>
            <div class="exp">
               <span style="width: ${(randomNumber * 100) / pokemon.baseExperience}%;"></span>
            </div>
         </div>
         <div class="pokemon-info">
            <span class="title-3">Informações</span>
            <div class="height">
               <span class="info-name">Altura</span>
               <span class="info-number">${pokemon.height / 10}m</span>
            </div>
            <div class="weight">
               <span class="info-name">Peso</span>
               <span class="info-number">${pokemon.weight / 10}kg</span>
            </div>
         </div>

         <div class="stats">
            <span class="title-3">Status Base</span>
            ${pokemon.stats.map(stat => `
               <div class="${stat.name}">
                  <span class="stats-name">${replaceHyphenAndUppercaseFirstLetter(stat.name)}</span>
                  <span class="stat-number">${stat.number}</span>
               </div>
            `).join('')}
         </div>
      </div>
   `;
}

pokeApi.getPokemonById(idParam)
   .then(pokemon => {
      pokemonBg.classList.add(`${pokemon.mainType}`);
      header.innerHTML = convertPokemonDetailsToHtmlHeader(pokemon);
      containerDetails.innerHTML = convertPokemonDetailsToHtmlContent(pokemon);
   })
   .catch(err => console.error(err));