import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");

    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function handleAddToWatchlist() {
    const foundMovie = watchlist.find((item) => item.id === movie.id);

    if (!foundMovie) {
      setWatchlist([...watchlist, movie]);
    }
  }

  if (loading) {
    return <h2>Loading movie details...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-details-info">
        <h1>{movie.title}</h1>

        {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}

        <div className="movie-details-rating">
          <span>
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>

          <span>
            {movie.vote_count ? `${movie.vote_count} votes` : "No votes"}
          </span>
        </div>

        <p>
          <strong>Release Date:</strong> {movie.release_date || "N/A"}
        </p>

        <p>
          <strong>Runtime:</strong>{" "}
          {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
        </p>

        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres && movie.genres.length > 0
            ? movie.genres.map((genre) => genre.name).join(", ")
            : "N/A"}
        </p>

        <p>
          <strong>Language:</strong>{" "}
          {movie.original_language
            ? movie.original_language.toUpperCase()
            : "N/A"}
        </p>

        <p>
          <strong>Status:</strong> {movie.status || "N/A"}
        </p>

        <p>
          <strong>Production Companies:</strong>{" "}
          {movie.production_companies && movie.production_companies.length > 0
            ? movie.production_companies
                .map((company) => company.name)
                .join(", ")
            : "N/A"}
        </p>

        <div className="movie-overview">
          <h2>Overview</h2>

          <p>{movie.overview || "No overview available."}</p>
        </div>

        <button className="watchlist-button" onClick={handleAddToWatchlist}>
          Add to Watchlist
        </button>

        {movie.homepage && <a href={movie.homepage}>Official Website</a>}
      </div>
    </div>
  );
}

export default MovieDetails;
