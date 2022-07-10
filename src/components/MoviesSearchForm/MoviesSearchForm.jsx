import { useSearchForm } from '../../shared/hooks/useSearchForm';

const MoviesSearchForm = ({ onSubmit }) => {
  const [state, inputChangeHandler, transitQuery] = useSearchForm(
    { query: '' },
    onSubmit
  );

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
