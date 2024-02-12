"use strict";

import { loadSinglePokemon, setLoadingPokemon } from "pokemon";

/**
 * Loads a team of pokemon
 * @param {number[]} team The team to load
 */
export const loadTeam = (team) => {
  setLoadingPokemon("team-pokemon-box", team.length);
  team.forEach((id) => loadSinglePokemon("team-pokemon-box", id));
};
