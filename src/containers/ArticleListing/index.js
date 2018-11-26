import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Slider from 'react-animated-slider';
import { articlesFetchAction } from './state/actions';
import layouts from '../../components/ArticleCard/layouts';
import ArticleCard from '../../components/ArticleCard';

import ArticleCardLoader from '../../components/ArticleCardLoader';
import PreLoader from '../../components/PreLoader';
import { articleListingState } from './state/reducer';
import Empty from '../../components/Empty';
import placeholder from '../../assets/images/placeholder.jpg';
import './ArticleListing.scss';
import 'react-animated-slider/build/horizontal.css';

export class ArticleListing extends React.Component {
  state ={
    page: 1,
  };

  constructor(props) {
    super(props);

    this.load = this.load.bind(this);
  }

  componentDidMount = () => {
    const {
      url, fetchArticles, params, listName,
    } = this.props;
    fetchArticles(url, params, listName);
  };

  load() {
    const {
      fetchArticles, url, params, listName,
    } = this.props;
    fetchArticles(url, params, listName);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ page: nextProps.params.page || nextProps.pageStart });
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
      const {
        fetchArticles, url, params, listName,
      } = this.props;
      fetchArticles(url, {
        ...params,
        page,
      }, listName, true);
    }
  }

  renderFeaturedArticles = articles => (
    <div className="featured">
      <Slider className="slider-wrapper" autoplay={5000}>
        {articles.map(article => (
          <div
            key={article && article.slug}
            className="slider-content"
            style={{ background: `url('${(article && article.image) || placeholder}') no-repeat center center` }}
          >
            <div className="inner">
              <h1>{article && article.title}</h1>
              <p>{article && article.description}</p>
              <a className="btn" href={article && `/article/@${article.author.username}/${article.slug}`}>Read More</a>
            </div>
            <section>
              <img src={article && article.author.image} alt={article && article.author.username} />
              <span>
Posted by
                <strong>{article && article.author.username}</strong>
              </span>
            </section>
          </div>
        ))}
      </Slider>
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
  url: 'articles/',
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
  url: PropTypes.string,
};

const mapStateToProps = ({ articles }) => articles;
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchArticles: articlesFetchAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListing);
