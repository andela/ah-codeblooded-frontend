import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { articlesFetchAction } from './state/actions';
import layouts from '../../components/ArticleCard/layouts';
import ArticleCard from '../../components/ArticleCard';

import ArticleCardLoader from '../../components/ArticleCardLoader';

class ArticleListing extends React.Component {
  componentDidMount = () => {
    const { fetchArticles, params } = this.props;
    fetchArticles(params);
  };


  renderArticle = (index, article) => {
    const { layoutProvider, isFetching } = this.props;
    const layout = layoutProvider(index, article);
    return (!article || isFetching || article === {}
      ? (<ArticleCardLoader layout={layout} />)
      : <ArticleCard article={article} layout={layout} {...this.props} key={article.slug} />);
  };

  renderArticles(articles) {
    const { featured } = this.props;
    return (
      featured ? this.renderFeaturedArticles(articles)
        : articles.map((article, index) => this.renderArticle(index, article))
    );
  }

  renderFeaturedArticles = articles => (
    <div className="card">
      <div className="card-content">
        <div className="row">
          <div className="col m4">
            {this.renderArticle(0, articles[0])}
          </div>
          <div className="col m8">
            {
              articles.map((article, index) => (
                (index > 0 && index <= 3) ? this.renderArticle(index, article) : null
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    const { articles: { results }, isFetching, initialList } = this.props;
    return (
      <div>
        {
         isFetching
           ? (this.renderArticles(Array(initialList).fill()))
           : this.renderArticles(results)
        }
      </div>
    );
  }
}


ArticleListing.defaultProps = {
  layoutProvider: () => layouts.HORIZONTAL_LAYOUT,
  initialList: 1,
  params: {},
};

ArticleListing.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  layoutProvider: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  articles: PropTypes.shape({}).isRequired,
  initialList: PropTypes.number,
  params: PropTypes.shape({}),
};

const mapStateToProps = ({ articles }) => articles;
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchArticles: articlesFetchAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListing);
