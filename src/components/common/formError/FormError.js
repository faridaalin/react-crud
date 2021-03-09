import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ children }) => {
  return <div className='form-error'>{children}</div>;
};

FormError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormError;
