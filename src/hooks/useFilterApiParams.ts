import { useReducer } from 'react';

const useFilterApiParams = <T extends object>(initFilter: T) => {
  type FilterAction =
    | { type: 'SET_FILTER'; payload: Partial<T> }
    | { type: 'RESET_FILTER' }
    | { type: 'REMOVE_FILTER'; payload: keyof T };

  const filterReducer = (state: T, action: FilterAction) => {
    switch (action.type) {
      case 'SET_FILTER':
        return { ...state, ...action.payload };
      case 'RESET_FILTER':
        return { ...initFilter };
      case 'REMOVE_FILTER': {
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      }
      default:
        return state;
    }
  };

  const [filter, filterDispatch] = useReducer(filterReducer, initFilter);

  return { filter, filterDispatch };
};

export default useFilterApiParams;
