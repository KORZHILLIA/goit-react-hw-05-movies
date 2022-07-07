const MovieExplicit = ({ img, title, date, score, overview, genres }) => {
  //   const preparedImgSrc = `https://image.tmdb.org/t/p/w500${img}`;
  //   const preparedReleaseDate = date.slice(0, 4);
  //   const allGenres = genres.map(genre => genre.name).join(', ') || '';
  return (
    <>
      <img src={`https://image.tmdb.org/t/p/w500${img}`} alt={title} />
      <p>
        <span>{title} </span>
        <span>({date && date.slice(0, 4)})</span>
      </p>
      <p>User score: {score}</p>
      <p>Overview: {overview}</p>
      <p>Genres: {genres && genres.map(genre => genre.name).join(', ')}</p>
    </>
  );
};

export default MovieExplicit;
