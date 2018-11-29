import api from "../../../utils/api";
import {
  FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE, UNFOLLOW_USER_SUCCESS,
  FETCH_FOLLOWERS_SUCCESS, FETCH_FOLLOWERS_FAILURE,
} from "./type";
import listTypes from '../../UsersListing/state/listTypes';
import {
  pageLoadingAction,
  pageLoadedAction,
} from "../../NavBar/state/actions";
import { fetchUsersAction } from "../../UsersListing/state/actions";
import { getCurrentUser } from "../../../utils/auth";

export const checkFollowers = payload => ({
  type: FETCH_FOLLOWERS_SUCCESS,
  payload,
});

export const checkFollowingFailure = error => ({
  type: FETCH_FOLLOWERS_FAILURE,
  error,
});

export const followSuccess = payload => ({
  type: FOLLOW_USER_SUCCESS,
  payload,
});

export const followFailure = error => ({
  type: FOLLOW_USER_FAILURE,
  error,
});

export const UnfollowSuccess = payload => ({
  type: UNFOLLOW_USER_SUCCESS,
  payload,
});

export const UnfollowFailure = error => ({
  type: UNFOLLOW_USER_FAILURE,
  error,
});

export const fetchAction = username => (dispatch) => {
  dispatch(pageLoadingAction());
  return api.get(`profiles/following/${username}`)
    .then((res) => {
      const following = res.data.following_status;
      if (following) {
        dispatch(checkFollowers(res.data));
        dispatch(pageLoadedAction());
      }
    }).catch((error) => {
      dispatch(checkFollowingFailure(error));
      dispatch(pageLoadedAction());
    });
};

export const followAction = username => (dispatch) => {
  dispatch(pageLoadingAction());
  const user = getCurrentUser();
  return api
    .post(`profiles/${username}/follow/`)
    .then((res) => {
      dispatch(followSuccess(res.data));
      dispatch(pageLoadedAction());
      dispatch(fetchUsersAction(user.username, listTypes.FOLLOWING));
      dispatch(fetchUsersAction(user.username, listTypes.FOLLOWERS));
    })
    .catch((errors) => {
      dispatch(followFailure(errors.response));
      dispatch(pageLoadedAction());
    });
};

export const unfollowAction = username => (dispatch) => {
  const user = getCurrentUser();
  return api.delete(`profiles/${username}/follow/`)
    .then((res) => {
      dispatch(UnfollowSuccess(res.data));
      dispatch(pageLoadedAction());
      dispatch(fetchUsersAction(user.username, listTypes.FOLLOWING));
      dispatch(fetchUsersAction(user.username, listTypes.FOLLOWERS));
    })
    .catch((errors) => {
      dispatch(UnfollowFailure(errors.response));
      dispatch(pageLoadedAction());
    });
};
