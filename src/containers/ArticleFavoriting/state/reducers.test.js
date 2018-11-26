import favoriteUnfavoriteReducer, { initialState } from './reducers';
import { FAVORITE_ARTICLE_SUCCESS, FAVORITE_UNFAVORITE_ERROR } from './types';

const favoriteAction = {
  type: FAVORITE_ARTICLE_SUCCESS,
  payload: false,
};

const action = { payload: {} };

export const errors = [
  'this is an error',
];

describe('the favorite and unfavorite reducer', () => {
  it('should return the initial state', () => {
    expect(favoriteUnfavoriteReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FAVORITE_ARTICLE', () => {
    expect(favoriteUnfavoriteReducer(undefined, favoriteAction)).toEqual({
      ...initialState,
      favorite: false,
      success: true,
    });
  });

  it('should handle UNFAVORITE_ARTICLE', () => {
    expect(favoriteUnfavoriteReducer(undefined, favoriteAction)).toEqual({
      ...initialState,
      favorite: false,
      success: true,
    });
  });

  it('should dispatch EDIT_PROFILE_ERROR when there is an error', () => {
    action.type = FAVORITE_UNFAVORITE_ERROR;
    action.payload = errors;
    expect(favoriteUnfavoriteReducer(initialState, action)).toEqual({
      errors,
      success: false,
      failure: true,
    });
  });
});
