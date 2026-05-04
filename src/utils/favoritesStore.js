import { STORAGE_KEY_FAVORITES } from "../constants/constants.js";
import { favoriteHeart } from "./heartSvg.js";
import { getCoverUrl } from "./covers.js";

const favoritesMap = new Map();

function saveToStorage() {
  const favoritesArray = Array.from(favoritesMap.values());
  localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favoritesArray));
}

export function loadFavoritesFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
  if (!stored) {
    return;
  }

  try {
    const favoritesArray = JSON.parse(stored);
    favoritesMap.clear();
    favoritesArray.forEach((book) => {
      if (book?.key) {
        favoritesMap.set(book.key, book);
      }
    });

  } catch (e) {
    console.error("Failed to parse favorites from localStorage", e);
  }
}

function updateCounter() {
  const span = document.querySelector(".favorite-logo-text p span");
  if (span) {
    span.textContent = String(favoritesMap.size);
  }
}

function attachRemoveFavoriteHandlers(container) {
  container.querySelectorAll(".remove-favorite-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const favDiv = icon.closest(".favorite-item");
      if (favDiv?.dataset.key) {
        removeFromFavorites(favDiv.dataset.key);
      }
    });
  });
}

export function renderFavoritesSidebar() {
  const container = document.getElementById("favorite-container");
  if (!container) {
    return;
  }

  if (favoritesMap.size === 0) {
    container.innerHTML =
      '<div class="empty-message">No favorite books yet</div>';
    updateCounter();
    return;
  }

  const parts = [];
  for (const [key, book] of favoritesMap.entries()) {
    const coverUrl = getCoverUrl(book.coverImageId, "M");
    const author = book.authors?.[0] ?? "Unknown";
    parts.push(`
      <div class="favorite-item" data-key="${key}">
        <img class="favorite-item-img" src="${coverUrl}" alt="${book.title}">

        <p class="favorite-name-of-book">
          <span>${book.title}</span> <br />
          ${author} <br />
          ${book.firstPublishYear ?? ""}
        </p>

        ${favoriteHeart()}
      </div>
      <hr class="hr-favorite">
    `);
  }
  container.innerHTML = parts.join("");
  updateCounter();
  attachRemoveFavoriteHandlers(container);
}

export function updateHeartIcon(bookKey, isLiked) {
  const btn = document.querySelector(`.btn-for-like[data-key="${bookKey}"]`);

  const svg = btn?.querySelector(".like-svg");
  if (!svg) {
    return;
  }

  svg.classList.toggle("liked-svg", isLiked);
}

function persistAndRefresh(bookKey, isLiked) {
  saveToStorage();
  updateHeartIcon(bookKey, isLiked);
  renderFavoritesSidebar();
}

export function addToFavorites(book) {

  if (!book.key || favoritesMap.has(book.key)) {
    return;
  }

  favoritesMap.set(book.key, { ...book });
  persistAndRefresh(book.key, true);
}

export function removeFromFavorites(bookKey) {

  if (!favoritesMap.has(bookKey)) {
    return;
  }

  favoritesMap.delete(bookKey);
  persistAndRefresh(bookKey, false);
}

export function toggleFavorite(bookData) {
  if (!bookData.key) {
    return;
  }
  if (favoritesMap.has(bookData.key)) {
    removeFromFavorites(bookData.key);
  }
  else {
    addToFavorites(bookData);
  }
}

export function hasFavorite(bookKey) {
  return favoritesMap.has(bookKey);
}

export function getFavoriteBook(bookKey) {
  return favoritesMap.get(bookKey);
}
