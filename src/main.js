"use strict";

// JS assets
import { fetchMyData } from "api";
import { setInfo, setInfoLoading, setInfoError } from "info";
import { setProfile, setProfileLoading, setProfileError } from "profile";
import { setStats, setStatsLoading, setStatsError } from "stats";
import { setHabitats, setHabitatsLoading, setHabitatsError } from "habitats";
import { loadTeam } from "team";
import { initTabs } from "tabs";
import { initPokedex } from "pokedex";

/**
 * Sets the loading state for several parts of the application
 */
const setLoadingState = () => {
  setProfileLoading();
  setInfoLoading();
  setStatsLoading();
  setHabitatsLoading();
};

/**
 * Sets the error state for several parts of the application
 * @param {() => void} onRetry A function to retry the loading process
 */
const setErrorState = (onRetry) => {
  setProfileError(onRetry);
  setInfoError(onRetry);
  setStatsError(onRetry);
  setHabitatsError(onRetry);
};

/**
 * Loads data from the API and loads in into the application
 */
const loadMyData = async () => {
  setLoadingState();
  const data = await fetchMyData();
  if (data) {
    setProfile(data.avatar_url);
    setInfo([
      { title: "Name", value: data.firstName },
      { title: "Age", value: data.age },
      { title: "Strengths", value: data.strengths.join(", ") },
      { title: "Weaknesses", value: data.weaknesses.join(", ") },
      { title: "Description", value: data.bio },
    ]);
    setStats(data.stats);
    setHabitats(data.habitats);
  } else {
    setErrorState(loadMyData);
  }
};

loadMyData();
loadTeam(
  Array(6)
    .fill()
    .map(() => Math.floor(1025 * Math.random()))
);
initPokedex();
initTabs();
