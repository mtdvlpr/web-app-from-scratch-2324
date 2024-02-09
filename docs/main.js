// JS assets
import { fetchMyData } from "api";
import { setInfo } from "info";
import { setProfile } from "profile";
import { setStats } from "stats";
import { setHabitats } from "habitats";
import { loadTeam } from "team";
import { initTabs } from "tabs";
import { initPokedex } from "pokedex";

/**
 * Loads data from the API and loads in into the application
 */
const loadMyData = async () => {
  const data = await fetchMyData();
  setProfile(data.avatar);
  setInfo([
    { title: "Name", value: data.name },
    { title: "Age", value: data.age },
    { title: "Strengths", value: data.strengths.join(", ") },
    { title: "Weaknesses", value: data.weaknesses.join(", ") },
    { title: "Description", value: data.description },
  ]);
  setStats(data.stats);
  setHabitats(data.habitats);
};

loadMyData();
loadTeam(
  Array(6)
    .fill()
    .map(() => Math.floor(1025 * Math.random()))
);
initPokedex();
initTabs();
