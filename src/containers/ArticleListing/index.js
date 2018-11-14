import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { articlesFetchAction } from './state/actions';
import layouts from '../../components/ArticleCard/layouts';
import ArticleCard from '../../components/ArticleCard';

import ArticleCardLoader from '../../components/ArticleCardLoader';
import PreLoader from '../../components/PreLoader';
import { articleListingState } from './state/reducer';
import Empty from '../../components/Empty';

export class ArticleListing extends React.Component {
  state ={
    page: 1,
  };

  componentDidMount = () => {
    const { fetchArticles, params, listName } = this.props;
    fetchArticles(params, listName);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ page: nextProps.params.page || 0 });
  };

  renderArticle = (index, article) => {
    const { layoutProvider, isFetching } = this.props;
    const layout = layoutProvider(index, article);
    return (!article || isFetching || article === {}
      ? (<ArticleCardLoader layout={layout} />)
      : <ArticleCard article={article} layout={layout} {...this.props} key={article.slug} />);
  };

  renderArticles(articles, totalPages) {
    const {
      featured,
    } = this.props;
    return (
      featured ? this.renderFeaturedArticles(articles)
        : this.renderArticleList(articles, totalPages)
    );
  }

  renderNoItems = () => {
    const { emptyMessage } = this.props;
    return <Empty message={emptyMessage} />;
  };

  renderArticleList = (articles, totalPages) => {
    const { pageStart, infiniteScroll } = this.props;
    const { page } = this.state;
    return (
      !articles || articles.length === 0 ? (
        this.renderNoItems()
      )
        : (
          <InfiniteScroll
            pageStart={pageStart}
            initialLoad={false}
            loadMore={p => this.loadMore(p, totalPages)}
            hasMore={page < totalPages && infiniteScroll}
            loader={<div className="center"><PreLoader /></div>}
          >
            {
        articles.map((article, index) => this.renderArticle(index, article))
      }
          </InfiniteScroll>
        ));
  };

  loadMore(page, totalPages) {
    this.setState({ page });
    if (page <= totalPages) {
      const { fetchArticles, params, listName } = this.props;
      fetchArticles({
        ...params,
        page,
      }, listName, true);
    }
  }

  renderFeaturedArticles = articles => (
    <div className="card featured">
      <div className="card-content">
        <div className="row">
          <div className="col m4 s12">
            {this.renderArticle(0, articles[0])}
          </div>
          <div className="col m5 s12">
            {
              articles.map((article, index) => (
                (index > 0 && index <= 3) ? this.renderArticle(index, article) : null
              ))
            }
          </div>
          <div className="col m3 s12">
            {this.renderArticle(0, articles[4])}
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    const {
      listName, initialList, infiniteScroll, filterResults,
    } = this.props;

    const { isFetching, articles } = this.props[listName] || articleListingState;

    const { results, total_pages: totalPages } = articles || { results: [], total_pages: 0 };

    const filtered = filterResults(results);
    return (
      <div>
        {
         isFetching && !infiniteScroll
           ? (this.renderArticles(Array(initialList).fill()))
           : this.renderArticles(filtered, totalPages)
        }
      </div>
    );
  }
}


ArticleListing.defaultProps = {
  layoutProvider: () => layouts.HORIZONTAL_LAYOUT,
  initialList: 1,
  params: {
    page: 1,
  },
  infiniteScroll: false,
  listName: 'articleList',
  pageStart: 1,
  filterResults: articles => articles.filter(article => article.published),
  emptyMessage: "No articles",
};

ArticleListing.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  layoutProvider: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  articles: PropTypes.shape({}).isRequired,
  initialList: PropTypes.number,
  params: PropTypes.shape({}),
  pageStart: PropTypes.number,
  infiniteScroll: PropTypes.bool,
  listName: PropTypes.string,
  filterResults: PropTypes.func,
  emptyMessage: PropTypes.string,
};

const mapStateToProps = ({ articles }) => articles;
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchArticles: articlesFetchAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListing);
