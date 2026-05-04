import appCss from "./style.css?inline";
import { DEFAULT_SEARCH_QUERY } from "./constants/constants.js";
import { loadFavoritesFromLocalStorage, renderFavoritesSidebar } from "./utils/favoritesStore.js";
import { fetchAndDisplayBooks, setupEventDelegation } from "./utils/bookGrid.js";

document.head.appendChild(
  Object.assign(document.createElement("style"), { textContent: appCss }),
);

document.addEventListener("DOMContentLoaded", () => {
  loadFavoritesFromLocalStorage();
  renderFavoritesSidebar();
  setupEventDelegation();
  fetchAndDisplayBooks(DEFAULT_SEARCH_QUERY);

  const btn = document.getElementById("btn-search");
  const input = document.getElementById("inp-search");
  if (!(btn && input)) {
    return;
  }

  btn.addEventListener("click", () => {
    const query = input.value.trim();
    if (query) {
      fetchAndDisplayBooks(query);
    }
    input.value = "";
  });
});
