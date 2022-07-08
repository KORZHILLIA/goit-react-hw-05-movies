import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import CastActor from './CastActor';

const Cast = () => {
  const [state, setState] = useState({
    cast: {},
    loading: false,
    error: null,
  });

  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const cast = await fetchDifferentMovieFeatures(movieId, 'credits');
        setState(prevState => ({
          ...prevState,
          loading: false,
          cast,
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: error.message }));
      }
    };
    getCast();
  }, [movieId]);

  const { cast } = state;
  const isCastPresent = Object.keys(cast).length > 0;
  const { cast: movieCast } = cast;
  console.log(movieCast);
  const castList = isCastPresent
    ? movieCast.map(({ profile_path, id, original_name, character }) => (
        <li key={id}>
          <CastActor
            img={profile_path}
            name={original_name}
            character={character}
          />
        </li>
      ))
    : null;

  return <ul>{castList}</ul>;
};

export default Cast;
