import React from 'react';
import PropTypes from 'prop-types';
import Materialize from 'materialize-css';
import './DropDown.scss';

class DropDown extends React.Component {
  componentDidMount = () => {
    const dropdown = document.querySelectorAll('.dropdown-trigger');
    const { options, closeTrigger } = this.props;
    this.instance = Materialize.Dropdown.init(dropdown, {
      alignment: 'center',
      constrainWidth: false,
      coverTrigger: false,
      ...options,
    });

    if (closeTrigger) {
      /* istanbul ignore next */
      document.querySelectorAll(closeTrigger).forEach((item) => {
        item.addEventListener('click', () => {
          this.instance.close();
        });
      });
    }
  };

  render = () => {
    const { id, list, children } = this.props;
    return (
      <div id={id} className="dropdown-content drop-down">
        {list ? (
          <ul>
            {list}
          </ul>
        ) : (children)}
      </div>
    );
  }
}

DropDown.defaultProps = {
  list: null,
  children: null,
  options: {},
  closeTrigger: '',
};

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  list: PropTypes.shape(),
  children: PropTypes.shape(),
  options: PropTypes.shape(),
  closeTrigger: PropTypes.string,
};

export default DropDown;
