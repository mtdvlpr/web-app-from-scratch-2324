"use strict";

import { fetchPokemon } from "api";
import { loadSinglePokemon, setLoadingPokemon } from "pokemon";

// Default values
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
const MIN_PER_PAGE = 1;
const MAX_PER_PAGE = 20;

// State variables
let CURRENT_PAGE = DEFAULT_PAGE;
let PER_PAGE = DEFAULT_PER_PAGE;
let HAS_NEXT_PAGE = true;

/**
 * Sets the query paramaters to new values
 * @param {number} page The current page
 * @param {number} perPage How many Pokemon to display per page
 */
const setQueryParams = (page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE) => {
  const url = new URL(window.location);
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", perPage);
  window.history.pushState(null, "", url.toString());
};

/**
 * Validates the new per page value and loads the pokedex if valid
 */
const setPerPage = () => {
  const perPageInput = document.getElementById("pokedex-per-page-input");
  const value = perPageInput.valueAsNumber;
  const isValid =
    !isNaN(value) && value >= MIN_PER_PAGE && value <= MAX_PER_PAGE;

  const errorContainer = document.getElementById(
    "pokedex-per-page-input-error"
  );
  errorContainer.innerHTML = isValid
    ? ""
    : `Value should be a number between ${MIN_PER_PAGE} and ${MAX_PER_PAGE}.`;

  if (isValid) loadPokedex(1, value);
};

/**
 * Sets the state of the pagination elements
 * @param {boolean} loading Whether the pokemon are loading (disables elements)
 */
const setPagination = (loading = false) => {
  const perPageInput = document.getElementById("pokedex-per-page-input");
  const prevButton = document.getElementById("pokedex-prev");
  const nextButton = document.getElementById("pokedex-next");
  perPageInput.toggleAttribute("disabled", loading);
  prevButton.toggleAttribute("disabled", loading || CURRENT_PAGE === 1);
  nextButton.toggleAttribute("disabled", loading || !HAS_NEXT_PAGE);
};

/**
 * Loads a list of pokemon
 * @param {number} page The page to load
 * @param {number} perPage How many pokemon to load
 */
const loadPokedex = async (page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE) => {
  CURRENT_PAGE = page;
  PER_PAGE = perPage;
  setPagination(true);
  setQueryParams(page, perPage);
  setLoadingPokemon("pokedex-box", perPage);
  const result = await fetchPokemon(page, perPage);
  HAS_NEXT_PAGE = result?.hasNext;

  if (!result) setPokedexError(() => loadPokedex(page, perPage));

  const promises = [];
  result?.results.forEach((id) =>
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
 * Sets the pokedex to an error state
 * @param {() => void} onRetry A function to retry loading the pokedex
 */
const setPokedexError = (onRetry) => {
  const container = document.getElementById("pokedex-box");
  const error = document.createElement("div");
  error.style.marginTop = "1rem";
  error.style.display = "flex";
  error.style.flexDirection = "column";
  error.style.gap = "0.5rem";
  error.textContent = "Failed to load the pokedex";
  if (onRetry) {
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.onclick = onRetry;
    error.appendChild(button);
  }
  container.appendChild(error);
};

/**
 * Initializes the pokedex by fetching the first results and adding event listeners
 */
export const initPokedex = () => {
  const url = new URL(window.location);
  CURRENT_PAGE = +(url.searchParams.get("page") || NaN);
  PER_PAGE = +(url.searchParams.get("per_page") || NaN);
  if (isNaN(CURRENT_PAGE)) CURRENT_PAGE = DEFAULT_PAGE;
  if (isNaN(PER_PAGE)) PER_PAGE = DEFAULT_PER_PAGE;
  loadPokedex(CURRENT_PAGE, PER_PAGE);

  const perPageInput = document.getElementById("pokedex-per-page-input");
  const prevButton = document.getElementById("pokedex-prev");
  const nextButton = document.getElementById("pokedex-next");

  perPageInput.value = PER_PAGE;
  perPageInput.addEventListener("change", setPerPage);

  prevButton.addEventListener("click", () => {
    if (CURRENT_PAGE > 1) loadPokedex(CURRENT_PAGE - 1, PER_PAGE);
  });

  nextButton.addEventListener("click", () => {
    if (HAS_NEXT_PAGE) loadPokedex(CURRENT_PAGE + 1, PER_PAGE);
  });
};
