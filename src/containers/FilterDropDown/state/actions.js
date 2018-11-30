import api from '../../../utils/api';
import { FETCH_AUTHORS, FETCH_TAGS } from './types';

export const fetchAuthorsAction = () => dispatch => api.get('users/search/')
  .then((response) => {
    dispatch({ type: FETCH_AUTHORS, payload: response.data });
  });

export const fetchTagsAction = () => dispatch => api.get('tags/')
  .then((response) => {
    dispatch({ type: FETCH_TAGS, payload: response.data });
  });
