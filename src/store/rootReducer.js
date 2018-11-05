import { combineReducers } from "redux";
import article from "../pages/Articles/state/reducer";
import pageProgress from "../containers/NavBar/state/reducer";
import articles from "../containers/ArticleListing/state/reducer";
import social from "../pages/SocialLogin/state/reducers";
import signUp from "../containers/SignupForm/state/reducer";
import login from "../containers/LoginForm/state/reducer";

const rootReducer = combineReducers({
  article,
  pageProgress,
  articles,
  social,
  signUp,
  login,
});

export default rootReducer;
