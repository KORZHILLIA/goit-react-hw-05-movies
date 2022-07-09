import { useState } from 'react';

const MoviesSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    query: '',
  });

  function inputChangeHandler({ target }) {
    const { name, value } = target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  function transitQuery(event) {
    event.preventDefault();
    onSubmit({ ...state });
    setState({ query: '' });
  }

  const { query } = state;

  return (
    <form onSubmit={transitQuery}>
      <input
        type="text"
        name="query"
        value={query}
        onChange={inputChangeHandler}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default MoviesSearchForm;