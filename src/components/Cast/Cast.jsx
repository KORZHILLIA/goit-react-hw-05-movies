import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import CastActor from './CastActor';
import styles from './cast.module.css';

const Cast = () => {
  const [state, setState] = useState({
    cast: [],
    loading: false,
    error: null,
  });

  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const { cast } = await fetchDifferentMovieFeatures(movieId, 'credits');
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

  const { cast, loading, error } = state;
  const castList = cast.map(
    ({ profile_path, id, original_name, character }) => (
      <li className={styles.actor} key={id}>
        <CastActor
          img={profile_path}
          name={original_name}
          character={character}
        />
      </li>
    )
  );
  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      {!loading && !cast.length && <p>Sorry, we have no cast information</p>}
      {<ul className={styles.list}>{castList}</ul>}
    </>
  );
};

export default Cast;
