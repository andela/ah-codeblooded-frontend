import { PAGE_LOADED, PAGE_LOADING } from './types';

const initialState = {
  isPageLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case PAGE_LOADING:
    return {
      ...state,
      isPageLoading: true,
    };
  case PAGE_LOADED:
    return {
      ...state,
      isPageLoading: false,
    };
  default:
    return state;
  }
};
