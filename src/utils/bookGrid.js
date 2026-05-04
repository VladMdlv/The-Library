import { searchBooks } from './searchBooks.js';
import { catalogHeart } from './heartSvg.js';
import {
  getFavoriteBook,
  hasFavorite,
  toggleFavorite,
} from './favoritesStore.js';
import { getCoverUrl } from './covers.js';


export function displayBooks(books) {
  const container = document.getElementById('grid-container');
  if (!container) {
    return;
  }

  container.innerHTML = '';
  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'box';
    card.dataset.key = book.key;

    const coverUrl = getCoverUrl(book.coverImageId, 'L');
    const heartClass = hasFavorite(book.key)
      ? 'like-svg liked-svg'
      : 'like-svg';

    card.innerHTML = `
        <img src="${coverUrl}" class="box-cover" alt="${book.title}">
        <button class="btn-for-like" data-key="${book.key}">
          ${catalogHeart(heartClass)}
        </button>
        <p class="name-of-book">${book.title}</p>
        <p class="author-of-book">${book.authors[0]}</p>
        <p class="publication-date">${book.firstPublishYear || 'Not specified'}</p>
      `;
    container.appendChild(card);
  });
}

export async function fetchAndDisplayBooks(searchTerm) {
  const container = document.getElementById('grid-container');
  if (!container) {
    return;
  }
  
  container.innerHTML = `
    <div class="loading"> 
      ...Loading
    </div>`;
    
  try {
    const books = await searchBooks(searchTerm);
    displayBooks(books);
  } catch (err) {
    console.error(err);

    container.innerHTML = `
      <div class="failed-to-load">
        Failed to load books. Try again later.
      </div> `
  }
}

export function setupEventDelegation() {
  const catalog = document.getElementById('grid-container');
  if (!catalog) return;

  catalog.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-for-like');

    if (!btn) {
        return;
    };

    const bookKey = btn.dataset.key;
    if (!bookKey) {
        return;
    };

    const card = btn.closest('.box');
    if (!card) {
      return;
    }

    let bookData = getFavoriteBook(bookKey);
    if (!bookData) {
      const titleElem = card.querySelector('.name-of-book');
      const authorElem = card.querySelector('.author-of-book');
      const yearElem = card.querySelector('.publication-date');
      const imgElem = card.querySelector('.box-cover');
      let coverId = null;
      if (imgElem && imgElem.src) {
        const match = imgElem.src.match(/\/id\/(\d+)-L\.jpg/);
        if (match) coverId = parseInt(match[1], 10);
      }
      bookData = {
        key: bookKey,
        title: titleElem ? titleElem.innerText : 'No title',
        authors: [authorElem ? authorElem.innerText : 'Unknown author'],
        firstPublishYear:
          yearElem && yearElem.innerText !== 'Not specified'
            ? yearElem.innerText
            : null,
        coverImageId: coverId,
      };
    }
    toggleFavorite(bookData);
  });
}
