import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './movieExplicit.module.css';

const MovieExplicit = ({ img, title, date, score, overview, genres }) => {
  const preparedImgSrc = img
    ? `https://image.tmdb.org/t/p/w500${img}`
    : 'https://image.tmdb.org/t/p/w500/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg';
  const preparedReleaseDate = date.slice(0, 4);
  const allGenres = genres.map(genre => genre.name).join(', ');

  return (
    <div className={styles.explicitWrapper}>
      <img src={preparedImgSrc} alt={title} />
      <div className={styles.rightSide}>
        <p className={styles.paragraph}>
          <span className={styles.mainTitle}>{title} </span>
          <span className={styles.year}>({preparedReleaseDate})</span>
        </p>
        <p className={styles.paragraph}>User score: {score}</p>
        <p className={styles.bold}>Overview</p>
        <p className={styles.paragraph}> {overview}</p>
        <p className={styles.bold}>Genres</p>
        <p className={styles.paragraph}>{allGenres}</p>
      </div>
    </div>
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

export default memo(MovieExplicit);
