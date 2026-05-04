// This file replaces heart.svg. This lets to manage styles of heart
export const HEART_PATH_D =
  'M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 ' +
  '4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 ' +
  '2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 ' +
  '5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 ' +
  '1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 ' +
  '9.33333L8.00004 14L12.6667 9.33333Z';

// heart.svg for catalog of books 
export function catalogHeart(heartClass) {
  return `
        <svg
            class="${heartClass}"
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="${HEART_PATH_D}" />
          </svg>`;
}

// heart.svg for favorite books
export function favoriteHeart() {
  return `
        <svg
          class="remove-favorite-icon"
          width="25"
          height="25"
          viewBox="0 0 20 20"
          fill="#ef4444"
          stroke="none"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="${HEART_PATH_D}" />
        </svg>`;
}
