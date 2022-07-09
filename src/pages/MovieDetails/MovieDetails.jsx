import { useState, useEffect } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import MovieExplicit from 'components/MovieExplicit';
import styles from './movieDetails.module.css';

const MovieDetails = () => {
  const [state, setState] = useState({
    movie: {},
    loading: false,
    error: null,
  });

  const { movieId } = useParams();
  const location = useLocation();
  const backRef =
    location.state?.from ?? JSON.parse(localStorage.getItem('backRef'));
  if (location.state) {
    localStorage.setItem('backRef', JSON.stringify(location.state.from));
  }

  useEffect(() => {
    const getMovie = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const requiredMovie = await fetchDifferentMovieFeatures(movieId);
        setState(prevState => ({
          ...prevState,
          loading: false,
          movie: requiredMovie,
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: error.message }));
      }
    };
    getMovie();
  }, [movieId]);

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
      <Outlet />
    </>
  );
};

export default MovieDetails;
