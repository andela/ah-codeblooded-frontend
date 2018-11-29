import {
  FETCHING_USERS,
  FETCHING_USERS_FAILURE,
  FETCHING_USERS_SUCCESS,
} from "./type";
// import { pageLoadedAction, pageLoadingAction } from "../../NavBar/state/actions";
import api from "../../../utils/api";

export const fetchUsersSuccess = (payload, listName) => ({
  type: FETCHING_USERS_SUCCESS,
  payload: { data: payload, listName },
});

export const fetchingUsers = listName => ({
  type: FETCHING_USERS,
  payload: { listName },
});

export const fetchUsersFailure = (error, listName) => ({
  type: FETCHING_USERS_FAILURE,
  payload: { data: error, listName },
});

export const fetchUsersAction = (username, listName) => (dispatch) => {
  dispatch(fetchingUsers(listName));
  return api.get(`profiles/${username}/${listName}/`)
    .then((res) => {
      dispatch(fetchUsersSuccess(res.data, listName));
    }).catch((errors) => {
      dispatch(fetchUsersFailure(errors.response, listName));
    });
};
