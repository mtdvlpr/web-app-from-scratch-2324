import { fetchPokemon } from "api";
import { loadSinglePokemon, setLoadingPokemon } from "pokemon";

let CURRENT_PAGE = 1;
let PER_PAGE = 10;
let HAS_NEXT_PAGE = true;

/**
 * Sets the state of the pagination buttons
 * @param {boolean} loading Whether the pokemon are loading (disables buttons)
 */
const setPagination = (loading = false) => {
  const prevButton = document.getElementById("pokedex-prev");
  const nextButton = document.getElementById("pokedex-next");
  prevButton.toggleAttribute("disabled", loading || CURRENT_PAGE === 1);
  nextButton.toggleAttribute("disabled", loading || !HAS_NEXT_PAGE);
};

/**
 * Loads a list of pokemon
 * @param {number} page The page to load
 * @param {number} perPage How many pokemon to load
 */
const loadPokedex = async (page = 1, perPage = 10) => {
  CURRENT_PAGE = page;
  PER_PAGE = perPage;
  setPagination(true);
  setLoadingPokemon("pokedex-box", perPage);
  const result = await fetchPokemon(page, perPage);
  HAS_NEXT_PAGE = result.hasNext;

  const promises = [];
  result.results.forEach((id) =>
    promises.push(loadSinglePokemon("pokedex-box", id))
  );

  // Wait for all pokemon to be loaded
  await Promise.allSettled(promises);

  // Cleanup remaining skeleton loaders
  document
    .querySelectorAll(`#pokedex-box [data-skeleton]`)
    .forEach((skeleton) => {
      skeleton.remove();
    });

  setPagination();
};

/**
 * Initializes the pokedex by fetching the first results and adding event listeners
 */
export const initPokedex = () => {
  loadPokedex();

  const prevButton = document.getElementById("pokedex-prev");
  const nextButton = document.getElementById("pokedex-next");

  prevButton.addEventListener("click", () => {
    if (CURRENT_PAGE > 1) loadPokedex(CURRENT_PAGE - 1, PER_PAGE);
  });

  nextButton.addEventListener("click", () => {
    if (HAS_NEXT_PAGE) loadPokedex(CURRENT_PAGE + 1, PER_PAGE);
  });
};
