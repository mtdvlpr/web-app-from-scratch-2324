"use strict";

/**
 * Changes the active tab and its content
 * @param {number} id The id of the tab to activate
 */
const setTab = (id) => {
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) => {
    const tabId = tab.getAttribute("id").split("-")[1];
    tab.setAttribute("aria-selected", (id === tabId).toString());

    const controlsId = tab.getAttribute("aria-controls");
    const controls = document.getElementById(controlsId);
    controls.classList.toggle("active-tab", id === tabId);
  });
};

/**
 * Initializes the listeners for tabs
 */
export const initTabs = () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) => {
    const tabId = tab.getAttribute("id").split("-")[1];
    tab.addEventListener("click", () => {
      setTab(tabId);
    });
  });
};
