
const pokeApi = {}


const convertPokeApiDetailToPokemon = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    pokemon.weight = pokeDetail.weight
    console.log(pokeDetail)

    const types = pokeDetail.types.map((typeSolt) => typeSolt.type.name)
    
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
     pokemon.speed = pokeDetail.speed
     console.log(pokeDetail)

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}
pokeApi.getPokemons = (offSet = 0, limit = 6) => {

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails) 
}