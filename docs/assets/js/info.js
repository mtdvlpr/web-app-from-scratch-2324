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
