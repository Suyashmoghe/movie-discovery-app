import { useState } from "react";
import MovieGrid from "../components/MovieGrid";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");

    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  function handleRemoveFromWatchlist(movieId) {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);

    setWatchlist(updatedWatchlist);
  }

  return (
    <div className="home-container">
      <h1 className="home-title">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <h2>No movies in your watchlist.</h2>
      ) : (
        <MovieGrid
          movies={watchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
        />
      )}
    </div>
  );
}

export default Watchlist;
