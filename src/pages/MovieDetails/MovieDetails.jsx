import { useState, useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import MovieExplicit from 'components/MovieExplicit';

const MovieDetails = () => {
  const [state, setState] = useState({
    movie: {},
    loading: false,
    error: null,
  });

  const { movieId } = useParams();

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
    popularity,
    overview,
    genres,
  } = movie;

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <MovieExplicit
        img={backdrop_path}
        title={original_title}
        date={release_date}
        score={popularity}
        overview={overview}
        genres={genres}
      />
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </>
  );
};

export default MovieDetails;
