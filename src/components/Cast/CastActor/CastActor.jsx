import PropTypes from 'prop-types';

const CastActor = ({ name, img, character }) => {
  const preparedImgSrc = `https://image.tmdb.org/t/p/w500${img}`;
  return (
    <>
      {img && <img src={preparedImgSrc} alt={name} />}
      <p>Actor: {name}</p>
      <p>Character: {character ? character : 'Unknown'}</p>
    </>
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
