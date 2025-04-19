import React from 'react';

const Checkbox = ({ id, checked, onChange, label }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Checkbox;