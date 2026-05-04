import { OPEN_LIBRARY_ORIGIN, SEARCH_LIMIT } from '../constants/constants.js';

export async function searchBooks(query) {
  const url = `${OPEN_LIBRARY_ORIGIN}/search.json?q=${encodeURIComponent(query)}&limit=${SEARCH_LIMIT}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const limitLetters = 23;

    if (data.docs) {
      return data.docs.map((book) => ({
        title:
          book.title && book.title.length > limitLetters
            ? book.title.slice(0, limitLetters) + '...'
            : book.title || 'No title',
        authors: book.author_name || ['Author not specified'],
        firstPublishYear: book.first_publish_year,
        coverImageId: book.cover_i,
        key: book.key,
      }));
    }

    return [];

  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}
