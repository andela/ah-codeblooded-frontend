import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getArticleAction } from '../state/actions';
import NavBar from '../../../containers/NavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import Divider from '../../../components/Divider';
import ArticleProfileView from '../../../components/ArticleProfileView';
import './Read.scss';
import { getCurrentUser } from '../../../utils/auth';
import LikeDislike from '../../../containers/LikeDislike';
import ArticleViewLoader from '../../../components/ArticleViewLoader';
import { ErrorPage } from '../../ErrorPage';

import Rating from '../../../containers/Rating/index';

class Read extends Component {
  componentWillMount = () => {
    const {
      match: {
        params: { slug },
      },
      getArticle,
    } = this.props;
    if (slug !== 'new') {
      getArticle(slug);
    }
  };

  renderEditButton = () => {
    const {
      article: { slug },
      article: { author },
    } = this.props;
    const user = getCurrentUser();
    return user && author.username === user.username ? (
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large" href={`/articles/edit/${slug}`}>
          <i className="large material-icons">mode_edit</i>
        </a>
      </div>
    ) : null;
  };

  renderTags = tags => (
    <div className="row tags">
      <div className="col">
        {tags.map(tag => (
          <div className="tag">{tag}</div>
        ))}
      </div>
    </div>
  );

  renderArticle = (isFetched, article) => (isFetched ? (
    <ArticleViewLoader />
  ) : (
      <>
        <ArticleEditor {...this.props} readOnly />
        {this.renderTags(article.tags)}
        <LikeDislike slug={article.slug} />
      </>
  ));

  totalRating = total => (
    <div className="reviews-stats col s12">
      <span className="reviewers-small" />
      <span className="reviews-num">
        {total}
        24
      </span>
      total
    </div>
  );

  barWidth = (ratings, totalUsers) => `${(ratings / totalUsers) * 20}%`;

  barGraph = (star, pos, ratings, totalUsers) => (
    <div className="rating-histogram col s12">
      <div className={`rating-bar-container ${pos}`}>
        <span className="bar-label">
          <span className="star-tiny" />
          {star}
        </span>
        <span className="bar" style={{ width: this.barWidth(ratings, totalUsers) }} />
        <span className="bar-number">{ratings}</span>
      </div>
    </div>
  );

  checkErrors = () => {
    const { errors } = this.props;
    if (errors) {
      if (errors.status === 404) {
        return (
          <ErrorPage
            errorCode={404}
            errorMessage="The article you are looking for does not exist"
          />
        );
      }
    }
    return null;
  };

  render() {
    const { article, isFetching } = this.props;

    return (
      this.checkErrors() || (
        <div>
          <NavBar />
          <div style={{ marginTop: '50px' }} className="container">
            {isFetching ? (
              <div className="container">
                <ArticleViewLoader />
              </div>
            ) : (
              <>
                <ArticleProfileView article={article} user={getCurrentUser()} />
                <div className="row">
                  <div className="reviews-stats col s1">
                    <div className="score">{article.avg_rating.avg_rating.toFixed(1)}</div>
                    <span className="reviewers-small" />
                    <span className="reviews-num grey-text meta">
                      {article.avg_rating.total_user}
                      {' '}
total
                    </span>
                  </div>
                  <div className="col s11 bar-graph">
                    {this.barGraph(
                      5,
                      'five',
                      article.avg_rating.each_rating['5'],
                      article.avg_rating.total_user,
                    )}
                    {this.barGraph(
                      4,
                      'four',
                      article.avg_rating.each_rating['4'],
                      article.avg_rating.total_user,
                    )}
                    {this.barGraph(
                      3,
                      'three',
                      article.avg_rating.each_rating['3'],
                      article.avg_rating.total_user,
                    )}
                    {this.barGraph(
                      2,
                      'two',
                      article.avg_rating.each_rating['2'],
                      article.avg_rating.total_user,
                    )}
                    {this.barGraph(
                      1,
                      'one',
                      article.avg_rating.each_rating['1'],
                      article.avg_rating.total_user,
                    )}
                  </div>
                </div>
                <Divider />
                <div className="row">
                  <div className="col s12 m8 offset-m2">
                    <ArticleEditor {...this.props} readOnly />
                    {this.renderTags(article.tags)}
                    <LikeDislike slug={article.slug} />
                    <Rating />
                  </div>
                </div>
                {this.renderEditButton()}
              </>
            )}
          </div>
        </div>
      )
    );
  }
}

Read.propTypes = {
  history: PropTypes.shape({}).isRequired, // Add the actual shape --> key:value
  match: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetched: PropTypes.bool.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  errors: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ article, pageProgress }) => ({ ...article, ...pageProgress });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getArticle: getArticleAction,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Read);
