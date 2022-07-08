import PropTypes from 'prop-types';

const MovieExplicit = ({ img, title, date, score, overview, genres }) => {
  const preparedImgSrc = `https://image.tmdb.org/t/p/w500${img}`;
  const preparedReleaseDate = date.slice(0, 4);
  const allGenres = genres.map(genre => genre.name).join(', ');
  return (
    <>
      {img && <img src={preparedImgSrc} alt={title} />}
      <p>
        <span>{title} </span>
        <span>({preparedReleaseDate})</span>
      </p>
      <p>User score: {score}</p>
      <p>Overview: {overview}</p>
      <p>Genres: {allGenres}</p>
    </>
  );
};

MovieExplicit.defaultProps = {
  title: 'Title unknown',
  date: 'Release date unknown',
  score: 'Score unknown',
  overview: 'No overview yet',
  genres: [],
};

MovieExplicit.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  score: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default MovieExplicit;
