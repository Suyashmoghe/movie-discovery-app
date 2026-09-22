import { useEffect, useState } from "react";
import { getTopRatedMovies } from "../services/movieApi";
import MovieGrid from "../components/MovieGrid";

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getTopRatedMovies(1);

        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopRatedMovies();
  }, []);

  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      setError("");

      const nextPage = page + 1;

      const data = await getTopRatedMovies(nextPage);

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
      <h1 className="home-title">Top Rated Movies</h1>

      {loading && <h2>Loading movies...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && movies.length === 0 && <h2>No movies found.</h2>}

      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />

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

export default TopRated;
