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

const POKE_API = "https://pokeapi.co/api/v2";

/**
 * Fetches a single Pokemon from the PokeAPI
 * @param {number} id
 * @returns {Promise<{
 * id: number
 * name: string
 * image: string
 * description: string
 * }>} The fetched Pokemon
 */
export async function fetchSinglePokemon(id) {
  try {
    const response = await fetch(`${POKE_API}/pokemon-species/${id}`);
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

/**
 * Maps the search results to a list of Pokemon ids
 * @param {{name: string; url: string}[]} results The results from the search
 * @returns {number[]} The ids of the found pokemon
 */
const mapSearchResults = (results) => {
  const pattern = "/pokemon-species/";
  return results.map((result) => {
    return +result.url.substring(
      result.url.indexOf(pattern) + pattern.length,
      result.url.length - 1
    );
  });
};

/**
 * Fetches a list of Pokemon from the PokeAPI
 * @param {number} page The page number to fetch (1-indexed)
 * @param {number} perPage  The number of results per page
 * @returns {Promise<{results: number[]; hasNext: boolean}>} The paged ids of the fetched Pokemon and wether there are more pages
 */
export async function fetchPokemon(page, perPage) {
  try {
    const response = await fetch(
      `${POKE_API}/pokemon-species?limit=${perPage}&offset=${
        (page - 1) * perPage
      }`
    );
    const result = await response.json();
    const results = mapSearchResults(result.results);
    return {
      results,
      hasNext: !!result.next && results.length === perPage,
    };
  } catch (e) {
    console.error(e);
  }
}
