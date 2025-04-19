import React, { useState } from 'react';
import Checkbox from '../common/Checkbox';
import EditableRow from './EditableRow';

const EmployeeRow = ({ 
  employee, 
  isSelected, 
  onSelect, 
  onDelete, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleSaveEdit = (updatedEmployee) => {
    onUpdate(employee.id, updatedEmployee);
    setIsEditing(false);
  };
  
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      onDelete([employee.id]);
    }
  };
  
  if (isEditing) {
    return (
      <EditableRow 
        employee={employee} 
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }
  
  return (
    <tr className={isSelected ? 'selected' : ''}>
      <td>
        <Checkbox 
          id={`select-${employee.id}`}
          checked={isSelected}
          onChange={() => onSelect(employee.id)}
        />
      </td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.role}</td>
      <td className="actions-column">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={handleEditClick}
          aria-label={`Edit ${employee.name}`}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm ml-1"
          onClick={handleDeleteClick}
          aria-label={`Delete ${employee.name}`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;