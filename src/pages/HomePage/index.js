import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ROUTES from '../../utils/routes';
import NavBar from '../../containers/NavBar';
import ArticleListing from '../../containers/ArticleListing';
import layouts from '../../components/ArticleCard/layouts';
import { getCurrentUser } from '../../utils/auth';
import Divider from '../../components/Divider';

const user = getCurrentUser();

class HomePage extends Component {
  renderCreateButton = () => (
    user ? (
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-large teal"
          href={ROUTES.articles.createNew}
        >
          <i className="large material-icons">mode_edit</i>
        </a>
      </div>
    ) : null
  );

  feedLayout = index => (
    index % 2 === 0
      ? layouts.HORIZONTAL_LAYOUT
      : layouts.HORIZONTAL_REVERSE_LAYOUT
  );

  trendingLayout = () => (layouts.MINIMAL_LAYOUT);

  featuredLayout = index => (index === 0 ? layouts.VERTICAL_LAYOUT : layouts.MINIMAL_AUTHOR_LAYOUT);

  render() {
    return (
      <>
        <NavBar />
        {this.renderCreateButton()}

        <div className="row container">
          <div className="col s12">
            <ArticleListing
              initialList={3}
              featured
              {...this.props}
              layoutProvider={this.featuredLayout}
            />
          </div>
          <div className="col m8">
            <ArticleListing
              initialList={5}
              bordered
              {...this.props}
              layoutProvider={this.feedLayout}
            />
          </div>
          <div className="col m4">
            <h5>{'Popular on Author\'s Haven'}</h5>
            <Divider />
            <ArticleListing
              initialList={4}
              divided
              {...this.props}
              params={{ page_size: 4 }}
              layoutProvider={this.trendingLayout}
            />
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
