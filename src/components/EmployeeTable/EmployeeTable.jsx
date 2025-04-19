import React from 'react';
import EmployeeRow from './EmployeeRow';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, isLoading, error }) => {
  if (error) {
    return (
      <div className="error-message">
        <p>Error loading employee data: {error}</p>
      </div>
    );
  }

  if (employees.length === 0 && !isLoading) {
    return (
      <div className="empty-message">
        <p>No employees found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <EmployeeRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;