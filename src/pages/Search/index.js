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
      fetchArticles({ ...this.state }, "search");
    }

    render() {
      return (
        <div>
          <NavBar />
          <div className="container">
            <input name="search" onChange={this.onSearch} value={this.state.search} />
            <div className="row">
              <ConnectedArticleListing
                ref={(list) => { this.list = list; }}
                initialList={5}
                listName="search"
                params={{ search: this.state.search }}
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
