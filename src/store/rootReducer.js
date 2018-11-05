import { combineReducers } from 'redux';
import article from '../pages/Articles/state/reducer';
import pageProgress from '../containers/NavBar/state/reducer';
import articles from '../containers/ArticleListing/state/reducer';
import social from "../pages/SocialLogin/state/reducers";

const rootReducer = combineReducers({
  article,
  pageProgress,
  articles,
  social,
});

export default rootReducer;
