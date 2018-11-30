import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../../containers/NavBar';
import { articlesFetchAction } from '../../containers/ArticleListing/state/actions';
import ConnectedArticleListing from '../../containers/ArticleListing';
import FilterDropDown from '../../containers/FilterDropDown';
import './Search.scss';
import profile from '../../assets/images/profile.jpg';

export class Search extends Component {
    timeout = null;

    state ={
      search: '',
      tag: '',
      username: '',
      author: {},
    }

    onSearch = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        const { fetchArticles } = this.props;
        fetchArticles("articles/search_filter", { ...this.state }, "search");
      }, 500);
    }

    onFilterChanged = (tag, author) => {
      const { fetchArticles } = this.props;
      this.setState({ tag, username: author ? author.username : '', author });

      fetchArticles("articles/search_filter",
        { ...this.state, tag, username: author ? author.username : '' },
        "search");
    }

    renderFilters = (author, tag) => (
      <div className="card">
        <div className="card-content">
          <h4>Filters</h4>
          {
            author && author.username && (
              <div>
                <h6>Author</h6>
                <div className="chip">
                  <img src={author.image || profile} alt={author.username} />
                  {author.username}
                </div>
              </div>
            )
          }
          {
            tag && (
              <>
                <h6>Tag</h6>
                <div className="chip">
                  {tag}
                </div>
              </>
            )
          }
        </div>
      </div>
    )

    render() {
      const { author, tag } = this.state;
      return (
        <div>
          <NavBar />
          <div className="container">
            <div className="nav-wrapper">
              <div className="article-search">
                <div className="row">
                  <div className="input-field col s10">
                    <input type="search" name="search" required placeholder="Search here" onChange={this.onSearch} value={this.state.search} />
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  </div>
                  <div className="col s2">
                    <a href="#filter-dropdown" className="btn white-text dropdown-trigger" id="filter-dropdown-trigger">
                      <i className="material-icons left">filter_list</i>
                    Filter
                    </a>
                  </div>
                </div>
              </div>
              <FilterDropDown filtersChanged={this.onFilterChanged} />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col l8 s12">
                <ConnectedArticleListing
                  ref={(list) => { this.list = list; }}
                  initialList={5}
                  bordered
                  emptyMessage="We did not find any results"
                  listName="search"
                  url="articles/search_filter"
                />
              </div>
              <div className="col l3 s12">
                {
                  ((author && author.username) || tag) && this.renderFilters(author, tag)
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
}

Search.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchArticles: articlesFetchAction,
}, dispatch);

export default connect(null, mapDispatchToProps)(Search);
