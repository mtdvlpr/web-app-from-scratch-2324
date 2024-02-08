/**
 * Fetches local data from ./me.json
 * @returns {*} The fetched data
 */
export async function fetchMyData() {
  try {
    const response = await fetch("./me.json");
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

/**
 * Gets the localized value of a Pokemon attribute
 * @param {Record<string, string>[]} list The list of localized values
 * @param {string} key The key of the localized value property
 * @returns {string} The localized value
 */
const getLocalValue = (list, key) => {
  const local = list.find((item) => item.language.name === "en");
  return local ? local[key] : "???";
};

/**
 * Fetches a Pokemon from the PokeAPI
 * @param {number} id
 * @returns {Promise<{
 * id: number
 * name: string
 * image: string
 * description: string
 * }>} The fetched Pokemon
 */
export async function fetchPokemon(id) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const pokemon = await response.json();
    return {
      id,
      name: getLocalValue(pokemon.names, "name"),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
      description: getLocalValue(pokemon.flavor_text_entries, "flavor_text"),
    };
  } catch (e) {
    console.error(e);
  }
}
