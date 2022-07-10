import { useCallback } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useMovies } from 'shared/hooks/useMovies';
import MoviesSearchForm from 'components/MoviesSearchForm';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  const [state] = useMovies(
    { movies: [], loading: false, error: null },
    query,
    'searchMoviesByQuery'
  );

  const changeQuery = useCallback(
    ({ query }) => setSearchParams({ query }),
    [setSearchParams]
  );

  const { error, movies, loading } = state;
  const links = movies.map(({ id, original_title }) => (
    <li key={id}>
      <Link to={`${id}`} state={{ from: location }}>
        {original_title}
      </Link>
    </li>
  ));

  return (
    <>
      <MoviesSearchForm onSubmit={changeQuery} />
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul>{links}</ul>
    </>
  );
};

export default Movies;
