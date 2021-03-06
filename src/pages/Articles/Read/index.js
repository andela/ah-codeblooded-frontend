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
import ArticleFavoriting from '../../../containers/ArticleFavoriting';
import { ReportArticle } from "../../../containers/ReportArticle";
import ArticleViewLoader from '../../../components/ArticleViewLoader';
import { ErrorPage } from '../../ErrorPage';
import ConnectedCommentEditor from '../../../containers/CommentEditor';
import ConnectedCommentThread from '../../../containers/CommentThread';

import ArticleShare from "../../../components/ArticleShare";
import { getLocation } from "../../../utils/helpers";
import ConnectedRating from '../../../containers/Rating/index';
import ConnectedRatingStats from '../../../containers/RatingStats/index';
import { fetchViolationTypesAction, reportArticleAction } from '../../../containers/ReportArticle/state/actions';


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

    const { fetchViolationTypes } = this.props;
    fetchViolationTypes();
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

  renderArticleMenu = () => {
    const { article } = this.props;
    const user = getCurrentUser();
    return (
      user && !(article.author.username === user.username)
       && (
         <div className="row">
           <div className="col s1 offset-s11">
             <a className="dropdown-trigger" data-target="report-article-dropdown">
               <i className="material-icons right">more_vert</i>
             </a>
           </div>
         </div>
       )
    );
  };

  renderArticle = (isFetched, article) => (
    isFetched ? (
      <ArticleViewLoader />
    ) : (
      <React.Fragment>
        <ArticleEditor {...this.props} readOnly />
        {this.renderTags(article.tags)}
        <LikeDislike slug={article.slug} />
      </React.Fragment>
    )
  );

  checkErrors= () => {
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
    const { article, isFetching, articleReporting } = this.props;
    const user = getCurrentUser();

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
                {this.renderArticleMenu()}
                <ReportArticle {...this.props} reports={articleReporting} />

                <div className="row">
                  <ConnectedRatingStats slug={article.slug} />
                </div>
                <Divider />
                <div className="row">
                  <div className="col s12 m8 offset-m2">
                    <ArticleEditor {...this.props} readOnly />
                    {this.renderTags(article.tags)}
                    <span className=" col l8 s12 row valign-wrapper">
                      <LikeDislike slug={article.slug} />
                      <ArticleFavoriting
                        slug={article.slug}
                        favorite={article.favourited}
                        article={article}
                      />
                      <ArticleShare article={{ ...article, url: getLocation() }} />
                      <ConnectedRating slug={article.slug} />
                    </span>

                  </div>
                </div>
                <Divider />
                <div className="row">
                  <div className="col s10 offset-s1">
                    {
                      user
                      && <ConnectedCommentEditor slug={article.slug} />
                    }
                  </div>
                  <div className="col s8 offset-s2">
                    <ConnectedCommentThread slug={article.slug} />
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

const mapStateToProps = (
  { article, pageProgress, articleReporting },
) => ({ ...article, ...pageProgress, articleReporting });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getArticle: getArticleAction,
    reportArticle: reportArticleAction,
    fetchViolationTypes: fetchViolationTypesAction,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Read);
