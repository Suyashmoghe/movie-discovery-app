import { useEffect, useState } from "react";
import {
  getPopularMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre,
} from "../services/movieApi";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");

    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  function handleSearch(query) {
    setSearchQuery(query);
    setSelectedGenre(null);
    setPage(1);
  }

  function handleGenreSelect(genreId) {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setPage(1);
  }

  function handleAddToWatchlist(movie) {
    const foundMovie = watchlist.find((item) => item.id === movie.id);

    if (!foundMovie) {
      setWatchlist([...watchlist, movie]);
    }
  }

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();
        setGenres(data.genres);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        let data;

        if (searchQuery !== "") {
          data = await searchMovies(searchQuery, 1);
        } else if (selectedGenre !== null) {
          data = await getMoviesByGenre(selectedGenre, 1);
        } else {
          data = await getPopularMovies(1);
        }

        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchQuery, selectedGenre]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      setError("");

      const nextPage = page + 1;

      let data;

      if (searchQuery !== "") {
        data = await searchMovies(searchQuery, nextPage);
      } else if (selectedGenre !== null) {
        data = await getMoviesByGenre(selectedGenre, nextPage);
      } else {
        data = await getPopularMovies(nextPage);
      }

      setMovies((previousMovies) => [...previousMovies, ...data.results]);

      setPage(nextPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Discover Movies</h1>

        <p>Search, explore genres, and discover your next movie.</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <GenreFilter genres={genres} onGenreSelect={handleGenreSelect} />

      {loading && <h2>Loading movies...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && movies.length === 0 && <h2>No movies found.</h2>}

      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onAddToWatchlist={handleAddToWatchlist} />

          <div className="load-more-container">
            <button
              className="load-more-button"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More Movies"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
