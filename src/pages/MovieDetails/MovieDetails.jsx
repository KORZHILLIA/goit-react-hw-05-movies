import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import MovieExplicit from 'components/MovieExplicit';

const MovieDetails = () => {
  const [state, setState] = useState({
    movie: {},
    loading: false,
    error: null,
  });

  const { movieId: id } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const requiredMovie = await fetchDifferentMovieFeatures(id);
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
  }, []);

  const { movie } = state;
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
      {movie && (
        <MovieExplicit
          img={backdrop_path}
          title={original_title}
          date={release_date}
          score={popularity}
          overview={overview}
          genres={genres}
        />
      )}
    </>
  );
};

export default MovieDetails;
