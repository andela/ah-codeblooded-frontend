import React from 'react';
import PropTypes from 'prop-types';
import { randomKey } from '../../utils/helpers';


const TextInput = (
  {
    name, label, onChange, value, errors, type,
  },
) => (
  <div className="input-field">
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      className={`${errors.length > 0 ? ' invalid' : ''}`}
      onChange={onChange}
    />
    <label htmlFor={name}>{label}</label>
    {
      errors.map(error => (
        <span key={randomKey()} className="helper-text" data-error={error} />
      ))
    }
  </div>
);

TextInput.defaultProps = {
  errors: [],
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
};

export default TextInput;
