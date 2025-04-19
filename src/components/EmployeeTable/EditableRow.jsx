import React, { useState } from 'react';

const EditableRow = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    role: employee.role
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <tr className="editing-row">
      <td></td>
      <td>
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </td>
      <td>
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div className="error-text">{errors.email}</div>}
      </td>
      <td>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={errors.role ? 'error' : ''}
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        {errors.role && <div className="error-text">{errors.role}</div>}
      </td>
      <td className="actions-column">
        <button 
          className="btn btn-success btn-sm"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button 
          className="btn btn-secondary btn-sm ml-1"
          onClick={onCancel}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;