import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../../containers/NavBar';
import { articlesFetchAction } from '../../containers/ArticleListing/state/actions';
import ConnectedArticleListing from '../../containers/ArticleListing';

class Search extends Component {
    state ={
      search: '',
    }

    componentWillMount() {

    }

    onSearch = (e) => {
      const { fetchArticles } = this.props;
      this.setState({ [e.target.name]: e.target.value });
      fetchArticles("articles/search_filter", { ...this.state }, "search");
    }

    render() {
      return (
        <div>
          <NavBar />
          <div className="container">
            <div className="nav-wrapper">
              <form>
                <div className="input-field">
                  <input type="search" name="search" required placeholder="Search here" onChange={this.onSearch} value={this.state.search} />
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                </div>
              </form>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <ConnectedArticleListing
                ref={(list) => { this.list = list; }}
                initialList={5}
                emptyMessage="We did not find any results"
                listName="search"
                url="articles/search_filter"
              />
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
