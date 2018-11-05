import axios from 'axios';
import { REGISTER_USER, REGISTER_ERROR } from './types';

const registerUserAction = userData => (dispatch) => {
  axios.post('http://localhost:8000/api/users/', userData)
    .then((data) => {
      dispatch({
        type: REGISTER_USER,
        payload: data.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: REGISTER_ERROR,
        payload: errors.response.data.errors,
      });
    });
};

export default registerUserAction;
