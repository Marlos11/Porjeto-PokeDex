const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('load-more-button')
const maxRecords = 151
const limit = 10
let offSet = 0





const convertPokemonLi = (pokemon) => {
    return `
    <li class="list-pokemons ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types ">
         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
       <li class="type ${pokemon.type}"> Weight : ${pokemon.weight}</li>
        
            
        </ol>
        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
           

            
            
        
    </div>

</li>

        `
}
const loadPokemonItens = (offSet, limit) => {
    pokeApi.getPokemons(offSet, limit).then((pokemons) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonLi).join('')
    })
}
loadPokemonItens(offSet, limit)

loadMoreButton.addEventListener('click', () => {
    offSet += limit

    const qtRecordNextPage = offSet + limit
    if (qtRecordNextPage >= maxRecords) {
        const newList = maxRecords - offSet
        loadPokemonItens(offSet, newList)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {

        loadPokemonItens(offSet, limit)
    }


})



