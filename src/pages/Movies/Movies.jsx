import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from 'shared/services/moviesApi';
import MoviesSearchForm from 'components/MoviesSearchForm';

const Movies = () => {
  const [state, setState] = useState({
    query: '',
    movies: [],
    loading: false,
    error: null,
  });

  const { query } = state;

  useEffect(() => {
    if (!query) {
      return;
    }
    const getMovies = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const { results } = await fetchMoviesByQuery(query);
        setState(prevState => ({
          ...prevState,
          loading: false,
          movies: results,
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error: error.message,
          loading: false,
        }));
      }
    };
    getMovies();
  }, [query]);

  const { error, movies, loading } = state;
  const links = movies.map(({ id, original_title }) => (
    <li key={id}>
      <Link to={`${id}`}>{original_title}</Link>
    </li>
  ));

  return (
    <>
      <MoviesSearchForm onSubmit={setState} />
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul>{links}</ul>
    </>
  );
};

export default Movies;
