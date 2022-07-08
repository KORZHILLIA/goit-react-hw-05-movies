const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'f3ea85ad66a7076fbd3968a20cd79e45';

const params = new URLSearchParams({
  api_key: KEY,
  language: 'en-US',
  page: 1,
  include_adult: true,
});

async function getTrendingMoviesForDay() {
  const response = await fetch(`${BASE_URL}trending/movie/day?${params}`);
  if (!response.ok) {
    throw new Error('Something went wrong, try once again...');
  }
  const result = response.json();
  return result;
}

function fetchDifferentMovieFeatures(id, feature) {
  const finalFeature = feature ? `/${feature}` : '';
  const requiredFunction = async () => {
    const response = await fetch(
      `${BASE_URL}movie/${id}${finalFeature}?api_key=${KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Something went wrong, try once again...');
    }
    const result = response.json();
    return result;
  };
  return requiredFunction();
}

async function fetchMoviesByQuery(query) {
  const response = await fetch(
    `${BASE_URL}search/movie?${params}&query=${query}`
  );
  if (!response.ok) {
    throw new Error('You typed something wrong, please try again');
  }
  const result = response.json();
  return result;
}
export {
  getTrendingMoviesForDay,
  fetchDifferentMovieFeatures,
  fetchMoviesByQuery,
};

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
