"use strict";

import { TEXT_BODY_LOADER } from "loaders";

/**
 * Fills the stats container with the stats data
 * @param {{title: string; value: string}[]} stats The stats to display
 */
export const setStats = (stats) => {
  const container = document.getElementById("stats-container");
  container.innerHTML = "";
  stats.forEach((stat) => {
    const label = document.createElement("label");
    label.htmlFor = stat.title.toLowerCase();
    label.textContent = `${stat.title}:`;
    const meter = document.createElement("meter");
    meter.id = stat.title.toLowerCase();
    meter.value = stat.value;
    meter.max = 100;
    meter.textContent = `${stat.value}%`;
    container.appendChild(document.createElement("div")).append(label, meter);
  });
};

/**
 * Sets the stats container to loading state
 */
export const setStatsLoading = () => {
  const container = document.getElementById("stats-container");
  container.innerHTML = TEXT_BODY_LOADER.repeat(5);
};

/**
 * Sets the stats container to error state
 * @param {() => void} onRetry A function to retry the loading process
 */
export const setStatsError = (onRetry) => {
  const container = document.getElementById("stats-container");
  container.innerHTML = "<p>Could not load stats</p>";

  if (onRetry) {
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.onclick = onRetry;
    container.appendChild(button);
  }
};
