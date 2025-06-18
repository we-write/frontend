import { useReducer } from 'react';

type State = {
  inputKeyword: string;
  searchKeyword: string;
  searchType: '제목' | '소개글';
  selectedGenres: string[];
};

type Action =
  | { type: 'DISPATCH_INPUT_KEYWORD'; payload: string }
  | { type: 'DISPATCH_SEARCH_KEYWORD'; payload: string }
  | { type: 'DISPATCH_SEARCH_TYPE'; payload: '제목' | '소개글' }
  | { type: 'DISPATCH_SELECTED_GENRES'; payload: string[] };

const initialState: State = {
  inputKeyword: '',
  searchKeyword: '',
  searchType: '제목',
  selectedGenres: ['전체'],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'DISPATCH_INPUT_KEYWORD':
      return { ...state, inputKeyword: action.payload };
    case 'DISPATCH_SEARCH_KEYWORD':
      return { ...state, searchKeyword: action.payload };
    case 'DISPATCH_SEARCH_TYPE':
      return { ...state, searchType: action.payload };
    case 'DISPATCH_SELECTED_GENRES':
      return { ...state, selectedGenres: action.payload };
    default:
      return state;
  }
}

const useSearchReducer = () => {
  return useReducer(reducer, initialState);
};

export default useSearchReducer;
