import React from 'react';
import PropTypes from 'prop-types';
import { childrenPropType } from '../../../utils/propTypes';

const Menu = ({ right, children }) => (
  <ul className={`${right && 'right'} menu`}>
    {
      children
    }
  </ul>
);

Menu.defaultProps = {
  right: false,
  children: null,
};

Menu.propTypes = {
  right: PropTypes.bool,
  children: childrenPropType,
};

export default Menu;
