import React from 'react';
import PropTypes from 'prop-types';

const DropDownItem = ({ link, subList, children }) => (
  <li>
    {
      subList ? (
        <ul>
          {subList}
        </ul>
      )
        : (
          <a href={link}>{children}</a>
        )
    }
  </li>
);


DropDownItem.defaultProps = {
  link: null,
  subList: null,
  children: null,
};

DropDownItem.propTypes = {
  link: PropTypes.string,
  subList: PropTypes.arrayOf(PropTypes.shape()),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.shape]),
};
export default DropDownItem;
