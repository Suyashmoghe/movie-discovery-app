const BASE_URL = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
}
export async function getTopRatedMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  return response.json();
}

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query,
    )}&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
}

export async function getGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${apiKey}&language=en`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
}

export async function getMoviesByGenre(genreId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  return response.json();
}

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}
