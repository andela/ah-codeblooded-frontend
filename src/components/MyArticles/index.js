import React from 'react';
import Materialize from 'materialize-css';
import NavBar from '../../containers/NavBar';
import ConnectedArticleListing from '../../containers/ArticleListing';
import layouts from '../ArticleCard/layouts';
import './MyArticles.scss';
import ROUTES from '../../utils/routes';

class MyArticles extends React.Component {
  state={
    drafts: 0,
    published: 0,
  };

  componentDidMount() {
    Materialize.Tabs.init(document.querySelector(".tabs"), {});
  }

  layoutHandler = () => layouts.MINIMAL_LAYOUT;

  filter = (articles, published) => {
    const result = articles.filter(article => article.published === published);
    if (published) {
      this.setState({ published: result.length, drafts: articles.length - result.length });
    }
    return result;
  };

  filterDrafts = articles => this.filter(articles, false);

  filterPublished = articles => this.filter(articles, true);


  render() {
    const { drafts, published } = this.state;
    return (
      <>
        <NavBar />
        <div className="container">
          <div className="row valign-wrapper">
            <div className="col s6 m9">
              <h2>Your Articles</h2>
            </div>
            <div className="col s6 m3">
              <a href={ROUTES.articles.createNew} className="btn-bordered">
                Write a story
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m8 offset-m2">
              <div>
                <ul className="tabs">
                  <li className="tab col">
                    <a className="active" href="#drafts">
                              Drafts
                      <span className="count-badge">{drafts}</span>
                    </a>
                  </li>
                  <li className="tab col">
                    <a href="#public">
                              Published
                      <span className="count-badge">{published}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="drafts">
                <ConnectedArticleListing
                  layoutProvider={this.layoutHandler}
                  emptyMessage="You do not have any drafts"
                  filterResults={this.filterDrafts}
                />
              </div>
              <div id="public">
                <ConnectedArticleListing
                  layoutProvider={this.layoutHandler}
                  infiniteScroll
                  filterResults={this.filterPublished}
                  divided
                />
              </div>
            </div>
          </div>
        </div>
        </>
    );
  }
}

export default MyArticles;
