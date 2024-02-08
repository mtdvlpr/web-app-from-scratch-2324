import { fetchPokemon } from "api";

/**
 * Adds a pokemon card to the team container, replacing a skeleton card
 * @param {{
 * id: number
 * name: string
 * image: string
 * description: string
 * }} pokemon The pokemon to display
 */
const setPokemon = (pokemon) => {
  const card = document.createElement("article");
  card.classList.add("pokemon-card");
  card.appendChild(document.createElement("h3")).textContent = pokemon.name;

  const img = document.createElement("img");
  img.src = pokemon.image;
  img.alt = pokemon.name;
  card.appendChild(img);

  card.appendChild(document.createElement("p")).textContent =
    pokemon.description;

  const container = document.getElementById("team-pokemon-box");
  container.replaceChild(card, document.querySelector("[data-skeleton]"));
};

/**
 * Loads a pokemon and sets the pokemon card
 * @param {number} id The id of the pokemon to load
 */
const loadPokemon = async (id) => {
  const pokemon = await fetchPokemon(id);
  setPokemon(pokemon);
};

/**
 * Sets the team container to a loading state
 * @param {number} length The number of pokemon cards to display
 */
const setLoadingTeam = (length) => {
  const container = document.getElementById("team-pokemon-box");
  container.innerHTML = "";
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < length; i++) {
    container.append(cardTemplate.content.cloneNode(true));
  }
};

/**
 * Loads a team of pokemon
 * @param {string[]} team The team to load
 */
export const loadTeam = (team) => {
  setLoadingTeam(team.length);
  team.forEach((id) => loadPokemon(id));
};
