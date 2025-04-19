import React from 'react';
import TableHeader from './TableHeader';
import EmployeeRow from './EmployeeRow';
import Modal from '../common/Modal';
import { useState } from 'react';

const EmployeeTable = ({ 
  employees,
  selectedEmployees,
  toggleSelectEmployee,
  toggleSelectAll,
  deleteEmployees,
  updateEmployee,
  sortConfig,
  onSort,
  loading,
  error
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const allSelected = 
    employees.length > 0 && 
    employees.every(emp => selectedEmployees.includes(emp.id));
  
  const handleBulkDelete = () => {
    setShowDeleteModal(true);
  };
  
  const confirmBulkDelete = () => {
    deleteEmployees(selectedEmployees);
    setShowDeleteModal(false);
  };
  
  if (loading) {
    return <div className="loading-message">Loading employees...</div>;
  }
  
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  
  if (employees.length === 0) {
    return <div className="no-results-message">No employees found.</div>;
  }
  
  return (
    <>
      <div className="table-actions mb-2">
        {selectedEmployees.length > 0 && (
          <button 
            className="btn btn-danger"
            onClick={handleBulkDelete}
          >
            Delete Selected ({selectedEmployees.length})
          </button>
        )}
      </div>
      
      <div className="table-responsive">
        <table className="employees-table">
          <TableHeader 
            onSelectAll={toggleSelectAll}
            allSelected={allSelected}
            sortConfig={sortConfig}
            onSort={onSort}
            currentPageEmployees={employees}
          />
          <tbody>
            {employees.map(employee => (
              <EmployeeRow 
                key={employee.id}
                employee={employee}
                isSelected={selectedEmployees.includes(employee.id)}
                onSelect={toggleSelectEmployee}
                onDelete={deleteEmployees}
                onUpdate={updateEmployee}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        footer={
          <>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-danger ml-1"
              onClick={confirmBulkDelete}
            >
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete {selectedEmployees.length} selected employees?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default EmployeeTable;