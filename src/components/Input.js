import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (err, valid, baseClass) => {
  if (err) {
    return `${baseClass} error`;
  }

  if (valid) {
    return `${baseClass} valid`;
  }

  return baseClass;
};

export default function Input({
  classContainer,
  name,
  type,
  id,
  label,
  isSelect,
  errorMessage,
  className,
  isValid,
  hasBeenValidated,
  inputRef,
  ...props
}) {
  const inputProps = {
    id,
    name,
    type,
    className: getClassName(errorMessage, isValid, className),
    ref: inputRef,
    ...props,
  };
  return (
    <div className={`fieldWrapper ${classContainer}`}>
      <label htmlFor={id}>{label}</label>
      {isSelect ? <select {...inputProps} /> : <input {...inputProps} />}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <style jsx>{`
        label {
          display: block;
          font-size: 14px;
          line-height: 20px;
        }
        .field {
          position: relative;
        }
        input,
        select {
          border: 1px solid #999;
          box-sizing: border-box;
          display: block;
          height: 34px;
          line-height: 34px;
          padding: 0 4px;
          width: 100%;
        }
        select {
          background: linear-gradient(to bottom, #fff 0%, #f3f3f3 100%);
        }
        div.fieldWrapper {
          margin-bottom: 14px;
        }
        div.group {
          width: 48%;
        }
        div.small {
          max-width: 100px;
        }
        input.error {
          border-color: #c00;
        }
        input.valid {
          border-color: #769810;
        }
        div.error {
          background: #fafafa;
          border: 1px solid #ccc;
          border-radius: 3px;
          color: #c00;
          cursor: pointer;
          display: block;
          font-size: 11px;
          line-height: 1.3em;
          padding: 5px 7px;
          position: absolute;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  classContainer: '',
  errorMessage: '',
};

Input.propTypes = {
  type: PropTypes.string,
  classContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool,
  inputRef: PropTypes.func.isRequired,
};
