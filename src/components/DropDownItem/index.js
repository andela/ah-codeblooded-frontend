import React from 'react';
import PropTypes from 'prop-types';

const DropDownItem = ({
  link, subList, children, onClick, classNames,
}) => (
  <li onClick={onClick} className={`dropdown-item ${classNames}`}>
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
  onClick: null,
  classNames: '',
};

DropDownItem.propTypes = {
  link: PropTypes.string,
  classNames: PropTypes.string,
  subList: PropTypes.arrayOf(PropTypes.shape()),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.shape]),
};
export default DropDownItem;
