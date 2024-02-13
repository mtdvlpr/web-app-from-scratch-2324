"use strict";

import { TEXT_BODY_LOADER } from "loaders";

/**
 * Fills the info container with the info data
 * @param {{title: string; value: string}[]} info The info to display
 */
export const setInfo = (info) => {
  const list = document.createElement("ul");
  info.forEach(({ title, value }) => {
    list.appendChild(
      document.createElement("li")
    ).textContent = `${title}: ${value}`;
  });
  const container = document.getElementById("infoContainer");
  container.innerHTML = "";
  container.appendChild(list);
};

/**
 * Sets the info container to a loading state
 */
export const setInfoLoading = () => {
  const container = document.getElementById("infoContainer");
  container.innerHTML = TEXT_BODY_LOADER.repeat(5);
};

/**
 * Sets the info container to an error state
 * @param {() => void} onRetry A function to retry the loading process
 */
export const setInfoError = (onRetry) => {
  const container = document.getElementById("infoContainer");
  container.innerHTML = "<p>Could not load trainer info</p>";

  if (onRetry) {
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.onclick = onRetry;
    container.appendChild(button);
  }
};
