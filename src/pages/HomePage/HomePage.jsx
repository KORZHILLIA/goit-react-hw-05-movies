import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMoviesForDay } from 'shared/services/moviesApi';
const HomePage = () => {
  const [state, setState] = useState({
    movies: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        const { results: movies } = await getTrendingMoviesForDay();
        setState(prevState => ({ ...prevState, loading: false, movies }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: error.message }));
      }
    };
    getTrendingMovies();
  }, []);

  const { movies, loading, error } = state;
  const homePageMovies = movies.map(({ original_title, id }) => (
    <li key={id}>
      <Link to={`movies/${id}`}>{original_title}</Link>
    </li>
  ));
  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      <ul>{homePageMovies}</ul>
    </>
  );
};

export default HomePage;
