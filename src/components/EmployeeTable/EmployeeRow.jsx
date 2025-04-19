import React from 'react';
import './EmployeeRow.css';

const EmployeeRow = ({ employee }) => {
  return (
    <tr className="employee-row">
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>
        <span className={`role-badge role-${employee.role}`}>
          {employee.role}
        </span>
      </td>
    </tr>
  );
};

export default EmployeeRow;