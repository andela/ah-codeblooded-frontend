import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ROUTES from '../../utils/routes';
import NavBar from '../../containers/NavBar';
import ConnectedArticleListing from '../../containers/ArticleListing';
import layouts from '../../components/ArticleCard/layouts';
import { getCurrentUser } from '../../utils/auth';
import Divider from '../../components/Divider';

const user = getCurrentUser();

class HomePage extends Component {
  renderCreateButton = () => (
    user ? (
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-large"
          href={ROUTES.articles.createNew}
        >
          <i className="large material-icons">mode_edit</i>
        </a>
      </div>
    ) : null
  );

  feedLayout = () => (layouts.HORIZONTAL_LAYOUT);

  trendingLayout = () => (layouts.MINIMAL_AUTHOR_LAYOUT);

  featuredLayout = index => (index === 0 ? layouts.VERTICAL_LAYOUT : layouts.MINIMAL_AUTHOR_LAYOUT);

  render() {
    return (
      <>
        <NavBar />
        {this.renderCreateButton()}

        <ConnectedArticleListing
          initialList={3}
          featured
          listName="featuredArticles"
          {...this.props}
          layoutProvider={this.featuredLayout}
        />
        <div className="row">
          <div className="row col s12 m12 l10 offset-l1">
            <div className="col m12 l8">
              <ConnectedArticleListing
                initialList={5}
                infiniteScroll
                listName="feed"
                {...this.props}
                bordered
                layoutProvider={this.feedLayout}
              />
            </div>
            <div className="col l4 m12">
              <h5>{'Popular on Author\'s Haven'}</h5>
              <Divider />
              <ConnectedArticleListing
                initialList={4}
                divided
                {...this.props}
                params={{ page_size: 7, page: 2 }}
                listName="popularArticles"
                layoutProvider={this.trendingLayout}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
HomePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
};
export default HomePage;
