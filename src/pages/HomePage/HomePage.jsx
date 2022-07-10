import { Link, useLocation } from 'react-router-dom';
import { useMovies } from 'shared/hooks/useMovies';
const HomePage = () => {
  const location = useLocation();

  const [state] = useMovies(
    {
      movies: [],
      loading: false,
      error: null,
    },
    0,
    'getTrendingMovies'
  );

  const { movies, loading, error } = state;
  const homePageMovies = movies.map(({ original_title, id }) => (
    <li key={id}>
      <Link to={`movies/${id}`} state={{ from: location }}>
        {original_title}
      </Link>
    </li>
  ));
  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul>{homePageMovies}</ul>
    </>
  );
};

export default HomePage;
