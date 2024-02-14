"use strict";

import { TEXT_BODY_LOADER } from "loaders";

/**
 * Parses the value of a habitat, returning a link element if it's a URL
 * @param {string} title The title of the habitat
 * @param {string} value The value of the habitat
 * @returns {string} The parsed value
 */
const parseValue = (title, value) => {
  if (value.startsWith("https")) {
    return `<a href="${value}" target="_blank" rel="noopener noreferrer">Open ${title}</a>`;
  }
  return value;
};

/**
 * Fills the habitat container with the habitat data
 * @param {{title: string; value: string;}[]} habitats The habitats to display
 */
export const setHabitats = (habitats) => {
  const list = document.createElement("ul");
  habitats.forEach(({ title, value }) => {
    if (title !== "Personal Page") {
      list.appendChild(
        document.createElement("li")
      ).innerHTML = `${title}: ${parseValue(title, value)}`;
    }
  });

  const container = document.getElementById("habitat-container");
  container.innerHTML = "";
  container.appendChild(list);
};

/**
 * Sets the habitats container to loading state
 */
export const setHabitatsLoading = () => {
  const container = document.getElementById("habitat-container");
  container.innerHTML = TEXT_BODY_LOADER.repeat(3);
};

/**
 * Sets the habitats container to error state
 * @param {() => void} onRetry A function to retry the loading process
 */
export const setHabitatsError = (onRetry) => {
  const container = document.getElementById("habitat-container");
  container.innerHTML = "<p>Could not load habitats</p>";

  if (onRetry) {
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.onclick = onRetry;
    container.appendChild(button);
  }
};
