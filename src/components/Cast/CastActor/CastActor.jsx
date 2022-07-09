import PropTypes from 'prop-types';
import styles from './castActor.module.css';

const CastActor = ({ name, img, character }) => {
  const preparedImgSrc = img
    ? `https://image.tmdb.org/t/p/w500${img}`
    : 'https://image.tmdb.org/t/p/w500/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg';

  const chooseClassName = img => (img ? null : styles.fallback);

  return (
    <div className={styles.actor}>
      {<img className={chooseClassName()} src={preparedImgSrc} alt={name} />}
      <p>Actor: {name}</p>
      <p>Character: {character ? character : 'Unknown'}</p>
    </div>
  );
};

CastActor.defaultProps = {
  name: 'Unknown',
  character: 'Unknown',
};

CastActor.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  character: PropTypes.string,
};

export default CastActor;
