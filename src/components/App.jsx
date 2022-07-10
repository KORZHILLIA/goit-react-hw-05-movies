import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../shared/components/Header';
const HomePage = lazy(() => import('pages/HomePage'));
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Cast = lazy(() => import('pages/Cast'));
const Reviews = lazy(() => import('pages/Reviews'));
// import MovieDetails from 'pages/MovieDetails';
// import Cast from 'pages/Cast';
// import Reviews from 'pages/Reviews';

export const App = () => {
  return (
    <div className="container">
      <Header />
      <Suspense>
        <Routes fallback={<p>Loading...</p>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
