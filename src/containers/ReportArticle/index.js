import React, { Component } from 'react';
import Materialize from "materialize-css";
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Modal from "../../components/Modal";
import DropDown from "../../components/DropDown";
import DropDownItem from "../../components/DropDownItem";
import { REPORT_WITHOUT_DATA } from './state/types';


export class ReportArticle extends Component {
  constructor(props) {
    super(props);
    this.serverMessage = this.serverMessage.bind(this);
  }

  componentDidMount = () => {
    Materialize.Modal.init(document.querySelector('#report-modal'), {});
  };

  componentDidUpdate = () => {
    Materialize.FormSelect.init(document.querySelectorAll('select'), {});
  };


  state = {
    type: "",
    description: "",
  };

  serverMessage(history) {
    const { articleReporting } = this.props;
    const {
      success, hasErrors, errors, message,
    } = articleReporting;

    if (success) {
      swal("Article Reporting", message, "success");
      history.push("/");
    } else if (hasErrors) {
      if (errors === REPORT_WITHOUT_DATA) {
        Materialize.toast({ html: REPORT_WITHOUT_DATA });
      } else {
        swal("Article Reporting", errors, "error");
        history.push("/");
      }
    }
  }


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { article, history } = this.props;
    const data = { ...this.state };
    this.props.reportArticle(article.slug, data, () => {
      this.serverMessage(history);
    });
  };


  render() {
    const { reports } = this.props;
    return <>
      <Modal
        id="report-modal"
        title="Report this article"
        fixedFooter
        footer={(
          <button
            id="report-button"
            className="right btn-bordered"
            type="submit"
            onClick={this.handleSubmit}
          >
            Report
          </button>
          )}
      >
        <form action="">
          <div className="input-field">
            <select id="report-selection" name="type" value={this.state.type} onChange={this.onChange}>
              <option disabled selected>Select Violation Type</option>
              {
                  Object.keys(reports.reportTypes).map(key => (
                    <option value={key}>{reports.reportTypes[key]}</option>
                  ))
              }
            </select>
          </div>
          <div className="input-field">
            <span>Violation description</span>
            <textarea
              id="report-description"
              rows="20"
              cols="30"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              required
            />
          </div>
        </form>
      </Modal>
      <DropDown
        id="report-article-dropdown"
        list={(
          <DropDownItem>
            <a href="#report-modal" className="modal-trigger">Report</a>
          </DropDownItem>
        )}
      />
    </>;
  }
}
ReportArticle.defaultProps = {
  article: {},
};


ReportArticle.propTypes = {
  article: PropTypes.shape({}),
  articleReporting: PropTypes.shape({}).isRequired,
  reports: PropTypes.shape([]).isRequired,
  reportArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ReportArticle;
