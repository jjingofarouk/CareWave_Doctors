import React from "react";
import "./InputField.css"; // Mobile-first CSS for InputField

const InputField = ({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
  ...props
}) => (
  <div className={`form-group ${className}`}>
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      className="form-input"
      {...props}
    />
  </div>
);

export default InputField;
