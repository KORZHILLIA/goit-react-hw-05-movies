import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import Review from 'components/Review';

const Reviews = () => {
  const [state, setState] = useState({
    reviews: [],
    loading: false,
    error: null,
  });

  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const { results: reviews } = await fetchDifferentMovieFeatures(
          movieId,
          'reviews'
        );
        setState(prevState => ({
          ...prevState,
          loading: false,
          reviews,
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: error.message }));
      }
    };
    getCast();
  }, [movieId]);

  const { reviews, loading, error } = state;
  const reviewsList = reviews.map(({ id, author, content }) => (
    <li key={id}>
      <Review author={author} content={content} />
    </li>
  ));
  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>error</p>}
      {!loading && !reviews.length && (
        <p>Sorry, there're no reviews for this movie</p>
      )}
      <ul>{reviewsList}</ul>
    </>
  );
};

export default Reviews;
