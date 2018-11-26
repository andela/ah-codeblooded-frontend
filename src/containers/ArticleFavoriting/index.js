import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { favoriteArticleAction } from './state/actions';
import './ArticelFavoriting.scss';
import { getCurrentUser } from '../../utils/auth';

class FavoriteArticle extends Component {
  handleFavorite = () => {
    const { slug, favoriteArticle, favorite } = this.props;
    favoriteArticle(slug, favorite);
  }

  render() {
    const { favorite, article, user } = this.props;
    return !user || user.username === article.author.username ? null : (
      <div>
        <div className="col">
          <button
            type="button"
            onClick={this.handleFavorite}
            className="btn btn-flat waves-effect white"
          >
            <i className={`material-icons favourite-button ${favorite ? 'active' : ''}`}>
            favorite
            </i>
          </button>
        </div>
      </div>
    );
  }
}

FavoriteArticle.defaultProps = {
  user: getCurrentUser(),
};

FavoriteArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  favoriteArticle: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  favouriteArticles: PropTypes.shape({}).isRequired,
  article: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    favoriteArticle: favoriteArticleAction,
  },
  dispatch,
);

export const mapStateToProps = ({ favorite }) => favorite;


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteArticle);
