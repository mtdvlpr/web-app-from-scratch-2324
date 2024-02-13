"use strict";

import { IMAGE_LOADER } from "loaders";

/**
 * Sets the profile picture
 * @param {string} src The source of the profile picture
 */
export const setProfile = (src) => {
  const container = document.getElementById("profilePicture");
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Profile Picture";
  container.innerHTML = "";
  container.appendChild(img);
};

/**
 * Sets the profile picture to loading state
 */
export const setProfileLoading = () => {
  const container = document.getElementById("profilePicture");
  container.innerHTML = IMAGE_LOADER();
};

/**
 * Sets the profile picture to error state
 * @param {() => void} onRetry A function to retry the loading process
 */
export const setProfileError = (onRetry) => {
  const container = document.getElementById("profilePicture");
  container.innerHTML = "<img src='' alt='Could not load image' />";

  if (onRetry) {
    const button = document.createElement("button");
    button.textContent = "Retry";
    button.onclick = onRetry;
    container.appendChild(button);
  }
};
