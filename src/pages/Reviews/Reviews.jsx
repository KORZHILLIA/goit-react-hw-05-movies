import { useParams } from 'react-router-dom';
import { useMovies } from 'shared/hooks/useMovies';
import Review from 'components/Review';
import styles from './reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();

  const [state] = useMovies(
    { reviews: [], loading: false, error: null },
    movieId,
    'reviews'
  );

  const { reviews, loading, error } = state;
  const reviewsList = reviews.map(({ id, author, content }) => (
    <li className={styles.review} key={id}>
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
