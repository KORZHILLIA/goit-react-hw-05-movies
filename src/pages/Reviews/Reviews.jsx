import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDifferentMovieFeatures } from 'shared/services/moviesApi';
import Review from 'components/Review';

const Reviews = () => {
  const [state, setState] = useState({
    reviews: {},
    loading: false,
    error: null,
  });

  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const reviews = await fetchDifferentMovieFeatures(movieId, 'reviews');
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

  const { reviews } = state;
  const isReviewsPresent = Object.keys(reviews).length > 0;
  const { results } = reviews;
  const reviewsList = isReviewsPresent
    ? results.map(({ id, author, content }) => (
        <li key={id}>
          <Review author={author} content={content} />
        </li>
      ))
    : null;

  return <ul>{reviewsList}</ul>;
};

export default Reviews;
