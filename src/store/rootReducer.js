import { combineReducers } from 'redux';
import article from '../pages/Articles/state/reducer';
import pageProgress from '../containers/NavBar/state/reducer';
import articles from '../containers/ArticleListing/state/reducer';
import social from '../containers/SocialLogin/state/reducers';
import signUp from '../containers/SignupForm/state/reducer';
import activateAccount from '../containers/ActivateAccount/state/reducer';
import login from '../containers/LoginForm/state/reducer';
import forgotPassword from '../containers/ForgotPasswordForm/state/reducer';
import resetPassword from '../containers/ResetPasswordForm/state/reducer';
import likeDislike from '../containers/LikeDislike/state/reducer';
import userProfiles from '../containers/profiles/state/reducers';
import commenting from '../containers/CommentEditor/state/reducer';
import comments from '../containers/CommentThread/state/reducer';
import subscribe from '../containers/Subscribe/state/reducer';
import rate from '../containers/Rating/state/reducer';
import ratingStats from '../containers/RatingStats/state/reducer';
import favorite from "../containers/ArticleFavoriting/state/reducers";

const rootReducer = combineReducers({
  article,
  pageProgress,
  articles,
  social,
  signUp,
  login,
  forgotPassword,
  resetPassword,
  likeDislike,
  userProfiles,
  activateAccount,
  subscribe,
  rate,
  ratingStats,
  commenting,
  comments,
  favorite,
});

export default rootReducer;
