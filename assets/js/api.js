// Fetch json data from root of the app
export async function getMyData() {
  try {
    const response = await fetch('./me.json')
    return await response.json()
  } catch (e) {
    console.error(e)
  }
}

const getLocalValue = (list, key) => {
  const local = list.find((item) => item.language.name === "en");
  return local ? local[key] : "???";
}

export async function fetchPokemon(id) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    console.log(response)
    const pokemon = await response.json()
    console.log(pokemon)
    return {
      id,
      name: getLocalValue(pokemon.names, "name"),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
      description: getLocalValue(pokemon.flavor_text_entries, "flavor_text"),
    }
  } catch (e) {
    console.error(e)
  }
}