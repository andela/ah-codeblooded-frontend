import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import { childrenPropType } from "../../utils/propTypes";

const Modal = ({
  id,
  children,
  title,
  bottomSheet,
  fixedFooter,
  footer,
}) => (
  <div id={id} className={`modal ${fixedFooter && 'modal-fixed-footer'} ${bottomSheet && 'bottom-sheet'}`}>
    <div className="modal-content">
      <h4>{ title }</h4>
      { children }
    </div>
    {
      footer && (
        <div className="modal-footer">
          {footer}
        </div>
      )
    }
  </div>
);

Modal.defaultProps = {
  bottomSheet: false,
  fixedFooter: false,
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  bottomSheet: PropTypes.bool,
  fixedFooter: PropTypes.bool,
  footer: childrenPropType.isRequired,
};

export default Modal;
