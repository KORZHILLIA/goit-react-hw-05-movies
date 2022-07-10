import { useState, useEffect } from 'react';
import {
  fetchDifferentMovieFeatures,
  fetchMoviesByQuery,
  getTrendingMoviesForDay,
} from '../services/moviesApi';

let requiredInfo = null;

export function useMovies(initialState, dependenceVar, fetchParameter) {
  const [state, setState] = useState(initialState);
  const firstStateKey = Object.keys(state)[0];

  useEffect(() => {
    if (dependenceVar === null) {
      return;
    }
    const getInfoFunction = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));

        if (fetchParameter === 'searchMoviesByQuery') {
          requiredInfo = await fetchMoviesByQuery(dependenceVar);
        } else if (fetchParameter === 'getTrendingMovies') {
          requiredInfo = await getTrendingMoviesForDay();
        } else {
          requiredInfo = await fetchDifferentMovieFeatures(
            dependenceVar,
            fetchParameter
          );
        }
        let finalResult = requiredInfo;
        if (
          fetchParameter === 'reviews' ||
          fetchParameter === 'searchMoviesByQuery' ||
          fetchParameter === 'getTrendingMovies'
        ) {
          const { results } = requiredInfo;
          finalResult = results;
        }
        if (fetchParameter === 'credits') {
          const { cast } = requiredInfo;
          finalResult = cast;
        }
        setState(prevState => ({
          ...prevState,
          loading: false,
          [firstStateKey]: finalResult,
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    };
    getInfoFunction();
  }, [firstStateKey, dependenceVar, fetchParameter]);

  return [state];
}
