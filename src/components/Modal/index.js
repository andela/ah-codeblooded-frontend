import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({
  id, children, title,
}) => (
  <div id={id} className="modal">
    <div className="modal-content">
      <h4>{ title }</h4>
      { children }
    </div>
  </div>
);

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
