import { useState } from "react";

/**
 * useForm is a custom hook for managing form state.
 * It initializes the form with a given state and provides methods to update and reset the form.
 */
export const useForm = <T extends object>(initState: T) => {
  const [state, setState] = useState(initState);

  const onChange = (value: string, field: keyof T) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const reset = () => {
    setState(initState);
  };

  return {
    ...state,
    form: state,
    onChange,
    reset,
  };
};
