import { Link } from "react-router-dom";

function MovieCard({ movie, onAddToWatchlist, onRemoveFromWatchlist }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <img src={imageUrl} alt={movie.title} />

        <div className="movie-card-info">
          <h3>{movie.title}</h3>

          <p>{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>

          <p>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
        </div>
      </Link>

      {onAddToWatchlist && (
        <button
          className="watchlist-button"
          onClick={() => onAddToWatchlist(movie)}
        >
          Add to Watchlist
        </button>
      )}

      {onRemoveFromWatchlist && (
        <button
          className="watchlist-button"
          onClick={() => onRemoveFromWatchlist(movie.id)}
        >
          Remove from Watchlist
        </button>
      )}
    </div>
  );
}

export default MovieCard;
