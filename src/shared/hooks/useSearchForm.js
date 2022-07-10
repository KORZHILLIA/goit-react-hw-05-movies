import { useState } from 'react';

export const useSearchForm = (initialState, onSubmitFunction) => {
  const [state, setState] = useState(initialState);

  function inputChangeHandler({ target }) {
    const { name, value, type, checked } = target;
    const updatedValue = type === 'checkbox' ? checked : value;
    setState(prevState => ({ ...prevState, [name]: updatedValue }));
  }

  function transitQuery(event) {
    event.preventDefault();
    onSubmitFunction({ ...state });
    setState(initialState);
  }

  return [state, inputChangeHandler, transitQuery];
};
