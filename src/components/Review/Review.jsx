import PropTypes from 'prop-types';

const Review = ({ author, content }) => (
  <>
    <p>Author: {author}</p>
    <p>{content}</p>
  </>
);

Review.defaultProps = {
  author: 'Unknown',
  content: 'Unknown',
};

Review.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
};

export default Review;
