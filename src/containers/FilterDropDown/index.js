import React from 'react';
import './FilterDropDown.scss';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Materialize from 'materialize-css';
import { connect } from 'react-redux';
import DropDown from '../../components/DropDown';
import { fetchAuthorsAction, fetchTagsAction } from './state/actions';

class FilterDropDown extends React.Component {
  componentDidMount = () => {
    const { fetchTags, fetchAuthors } = this.props;
    fetchTags();
    fetchAuthors();
  }

  selectAll = (e) => {
    e.target.select();
  };

  componentWillReceiveProps = (nextProps) => {
    this.authorsInstance = Materialize.Autocomplete.init(this.authors, { data: nextProps.authors });
    this.tagsInstance = Materialize.Autocomplete.init(this.tags, { data: nextProps.tags });
  };

  onFilter = () => {
    const { authors, filtersChanged } = this.props;
    const tag = this.tags.value;
    const author = this.authors.value
      ? { username: this.authors.value, image: authors[this.authors.value] } : null;

    filtersChanged(tag, author);
  };

  clearFilters = () => {
    this.authors.value = '';
    this.tags.value = '';
    Materialize.updateTextFields();
  }

  render() {
    return (
      <DropDown
        id="filter-dropdown"
        options={{ closeOnClick: false, constrainWidth: false }}
        closeTrigger=".dropdown-close"
      >
        <div className="title">
          <h5>Filter by</h5>
        </div>
        <div className="content">
          <div className="input-field">
            <input
              type="text"
              name="author"
              onFocus={this.selectAll}
              className="autocomplete"
              id="authors"
              ref={(authors) => { this.authors = authors; }}
            />
            <label>Author</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="tag"
              onFocus={this.selectAll}
              className="autocomplete"
              id="tags"
              ref={(tags) => { this.tags = tags; }}
            />
            <label>Tag</label>
          </div>
        </div>
        <div className="footer">
          <div className="row right">
            <button className="btn btn-flat white" type="button" onClick={this.clearFilters}>Clear</button>
            <button className="btn dropdown-close" type="button" onClick={this.onFilter}>Apply</button>
          </div>
        </div>
      </DropDown>
    );
  }
}

FilterDropDown.propTypes = {
  fetchTags: PropTypes.func.isRequired,
  fetchAuthors: PropTypes.func.isRequired,
  authors: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
  filtersChanged: PropTypes.func.isRequired,
};

const mapStateToProps = ({ filterArticles }) => filterArticles;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAuthors: fetchAuthorsAction,
  fetchTags: fetchTagsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropDown);
