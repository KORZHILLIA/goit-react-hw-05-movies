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
  const result = response.json();
  return result;
}

function fetchDifferentMovieFeatures(id, feature) {
  const finalFeature = feature ? `/${feature}` : '';
  const requiredFunction = async () => {
    const response = await fetch(
      `${BASE_URL}movie/${id}${finalFeature}?api_key=${KEY}&language=en-US`
    );
    const result = response.json();
    return result;
  };
  return requiredFunction();
}

// async function getMovieDetails(id) {
//   const response = await fetch(
//     `${BASE_URL}movie/${id}?api_key=${KEY}&language=en-US`
//   );
//   const result = response.json();
//   return result;
// }

// async function getMovieCredits(id) {
//   const response = await fetch(
//     `${BASE_URL}movie/${id}/credits?api_key=${KEY}&language=en-US`
//   );
//   const result = response.json();
//   return result;
// }

// async function getMovieReview(id) {
//     const response = await fetch(`${BASE_URL}movie/${id}/reviews?api_key=${KEY}&language=en-US`);
//     const result = response.json();
//     return result;
// }

// export { getTrendingMoviesForDay, getMovieDetails, getMovieCredits };

export { getTrendingMoviesForDay, fetchDifferentMovieFeatures };

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
