import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingMoviesForDay } from 'shared/services/moviesApi';
const HomePage = () => {
  const [state, setState] = useState({
    movies: [],
    loading: false,
    error: null,
  });

  const location = useLocation();

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        const { results: movies } = await getTrendingMoviesForDay();
        setState(prevState => ({ ...prevState, loading: false, movies }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          movies: [],
          error: error.message,
        }));
      }
    };
    getTrendingMovies();
  }, []);

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
