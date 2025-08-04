/**
 * @file useActions.ts
 * @description Custom hook for binding Redux action creators to dispatch
 * @hook
 */

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreator, bindActionCreators } from 'redux';

/**
 * Custom hook for binding Redux action creators to dispatch
 * @param actions - Array of action creators to bind to dispatch
 * @returns Array of bound action creators
 * @example
 * const [addTodo, removeTodo] = useActions([todoActions.addTodo, todoActions.removeTodo]);
 */
function useActions<T = any>(
  actions: ActionCreator<any>[]
): ActionCreator<any>[] {
  const dispatch = useDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(action => bindActionCreators(action, dispatch));
    }
    return bindActionCreators(actions, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...actions, dispatch]);
}

export default useActions;
