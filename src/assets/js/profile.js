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
