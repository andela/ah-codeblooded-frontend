import React from 'react';
import PropTypes from 'prop-types';
import { childrenPropType } from '../../../utils/propTypes';

class MenuItem extends React.Component {
  renderDefault = () => {
    const {
      icon, iconImage,
    } = this.props;
    return (
      <i className="material-icons black-text">
        {
            iconImage ? (
              <img src={iconImage} alt="" className="icon-image circle" />
            ) : icon
          }
      </i>
    );
  }

  render() {
    const {
      children, link, dropDown, badge,
    } = this.props;
    return (
      <li className="menu-item">
        {
          badge && (
            <div className="m-badge row">
              <span>{badge}</span>
            </div>
          )
        }
        <a
          href={link}
          className={dropDown && 'dropdown-trigger'}
          data-target={dropDown ? dropDown.props.id : null}
        >
          {
            children || this.renderDefault()
          }
        </a>
        {dropDown}
      </li>
    );
  }
}

MenuItem.defaultProps = {
  iconImage: null,
  dropDown: '',
  link: '#',
  icon: '',
  children: null,
  badge: "",
};

MenuItem.propTypes = {
  dropDown: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.string,
  iconImage: PropTypes.string,
  children: childrenPropType,
  badge: PropTypes.string,
};

export default MenuItem;
