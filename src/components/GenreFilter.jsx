function GenreFilter({ genres, onGenreSelect }) {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button key={genre.id} onClick={() => onGenreSelect(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
