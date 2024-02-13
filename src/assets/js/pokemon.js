"use strict";

import { fetchSinglePokemon } from "api";

/**
 * Adds a pokemon card to the specified container, replacing a skeleton card
 * @param {string} containerId The id of the container to load the pokemon into
 * @param {{
 * id: number
 * name?: string
 * image?: string
 * description?: string
 * }} pokemon The pokemon to display
 */
const setPokemon = (containerId, pokemon) => {
  const card = document.createElement("article");
  card.classList.add("pokemon-card");
  card.appendChild(document.createElement("h3")).textContent =
    pokemon.name ?? `Pokemon #${pokemon.id}`;

  const img = document.createElement("img");
  img.src = pokemon.image;
  img.alt = pokemon.name ?? `Could not load image`;
  card.appendChild(img);

  card.appendChild(document.createElement("p")).textContent =
    pokemon.description ?? "Could not load Pokémon";

  if (!pokemon.name) {
    card.setAttribute("data-pokemon-id", pokemon.id);
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.onclick = () => reloadSinglePokemon(containerId, pokemon.id);
    card.appendChild(button);
  }

  const container = document.getElementById(containerId);
  container.replaceChild(
    card,
    document.querySelector(`#${containerId} [data-skeleton]`)
  );
};

/**
 * Loads a pokemon and sets the pokemon card
 * @param {string} containerId The id of the container to load the pokemon into
 * @param {number} pokemonId The id of the pokemon to load
 */
export const loadSinglePokemon = async (containerId, pokemonId) => {
  const pokemon = await fetchSinglePokemon(pokemonId);
  setPokemon(containerId, pokemon ?? { id: pokemonId });
};

/**
 * Reloads a pokemon and sets the pokemon card
 * @param {string} containerId The id of the container to load the pokemon into
 * @param {number} pokemonId The id of the pokemon to load
 */
export const reloadSinglePokemon = async (containerId, pokemonId) => {
  setSinglePokemonLoading(containerId, pokemonId);
  const pokemon = await fetchSinglePokemon(pokemonId);
  setPokemon(containerId, pokemon ?? { id: pokemonId });
};

/**
 * Set a specific pokemon card to a loading state
 * @param {string} containerId The id of the container to load the pokemon cards into
 * @param {number} pokemonId Thepokemon to set to a loading state
 */
export const setSinglePokemonLoading = (containerId, pokemonId) => {
  const container = document.getElementById(containerId);
  const pokemonCard = container.querySelector(
    `[data-pokemon-id="${pokemonId}"]`
  );
  container.replaceChild(
    document.getElementById("card-template").content.cloneNode(true),
    pokemonCard
  );
};

/**
 * Displays pokemon cards in a loading state
 * @param {string} containerId The id of the container to load the pokemon cards into
 * @param {number} length The number of pokemon cards to display
 */
export const setLoadingPokemon = (containerId, length) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < length; i++) {
    container.append(cardTemplate.content.cloneNode(true));
  }
};
