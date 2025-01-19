import React from 'react';
import './SelectField.css';

const SelectField = ({ label, id, name, options }) => (
  <div className="select-field-container">
    <label htmlFor={id} className="select-label">
      {label}
    </label>
    <select id={id} name={name} className="select-field">
      <option value="" disabled>
        -- Select {label} --
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
