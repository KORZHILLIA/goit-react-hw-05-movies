import { useParams } from 'react-router-dom';
import { useMovies } from 'shared/hooks/useMovies';
import CastActor from '../../components/CastActor';
import styles from './cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [state] = useMovies(
    { cast: [], loading: false, error: null },
    movieId,
    'credits'
  );

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
