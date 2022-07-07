import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from 'pages/HomePage';
import MovieDetails from 'pages/MovieDetails';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/movies" element={<Movies />} /> */}
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        {/* <Route path="/movies/:movieId/cast" element={<Cast />} /> */}
        {/* <Route path="/movies/:movieId/reviews" element={<Reviews />} /> */}
      </Routes>
    </>
  );
};
