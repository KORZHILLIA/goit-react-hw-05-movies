import { Suspense } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { useMovies } from 'shared/hooks/useMovies';
import MovieExplicit from 'components/MovieExplicit';
import styles from './movieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [state] = useMovies(
    { movie: {}, loading: false, error: null },
    movieId,
    ''
  );

  const location = useLocation();
  const backRef =
    location.state?.from ?? JSON.parse(localStorage.getItem('backRef'));
  if (location.state) {
    localStorage.setItem('backRef', JSON.stringify(location.state.from));
  }

  const { movie, error, loading } = state;
  const {
    backdrop_path,
    original_title,
    release_date,
    vote_average,
    overview,
    genres,
  } = movie;

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <Link className={styles.backBtn} to={backRef}>
        Go back
      </Link>
      <MovieExplicit
        img={backdrop_path}
        title={original_title}
        date={release_date}
        score={`${Number(vote_average) * 10}%`}
        overview={overview}
        genres={genres}
      />
      <h2>Additional information</h2>
      <ul className={styles.infoList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<p>Loading subpage...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
