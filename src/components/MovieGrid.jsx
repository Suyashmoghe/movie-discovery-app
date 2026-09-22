import MovieCard from "./MovieCard";

function MovieGrid({ movies, onAddToWatchlist, onRemoveFromWatchlist }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
