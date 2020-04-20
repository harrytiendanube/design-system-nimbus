import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Input.scss";

const Input = ({
  name,
  className,
  placeholder,
  label,
  value,
  onChange,
  ...defaultProps
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div {...defaultProps} className={`input ${className}`}>
      <label className="" htmlFor={`input_${name}`}>
        {label}
      </label>
      <input
        className=""
        id={`input_${name}`}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

Input.defaultProps = {
  className: "",
  placeholder: "placeholder",
  value: "",
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Input;
