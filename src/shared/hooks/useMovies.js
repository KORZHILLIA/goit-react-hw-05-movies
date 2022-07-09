import { useState, useEffect } from 'react';
import { fetchDifferentMovieFeatures } from '../services/moviesApi';

export function useMovies(initialState, dependenceVar, fetchParameter) {
  const [state, setState] = useState({ ...initialState });
  const firstStateKey = Object.keys(state)[0];

  useEffect(() => {
    const getInfoFunction = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        const requiredInfo = await fetchDifferentMovieFeatures(
          dependenceVar,
          fetchParameter
        );
        let finalResult = requiredInfo;
        if (fetchParameter === 'reviews') {
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
        setState(prevState => ({ ...prevState, error: error.message }));
      }
    };
    getInfoFunction();
  }, [firstStateKey, dependenceVar, fetchParameter]);

  return [state, setState, useEffect];
}
