import React from 'react';
import Checkbox from '../common/Checkbox';

const TableHeader = ({ 
  onSelectAll, 
  allSelected, 
  sortConfig, 
  onSort,
  currentPageEmployees 
}) => {
  const getHeaderClasses = (key) => {
    if (!sortConfig || sortConfig.key !== key) return 'table-header';
    return `table-header sorted-${sortConfig.direction}`;
  };
  
  const getSortDirection = (key) => {
    if (!sortConfig || sortConfig.key !== key) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };
  
  return (
    <thead>
      <tr>
        <th className="checkbox-column">
          <Checkbox 
            id="select-all" 
            checked={allSelected && currentPageEmployees.length > 0} 
            onChange={() => onSelectAll(currentPageEmployees)}
          />
        </th>
        <th 
          className={getHeaderClasses('name')} 
          onClick={() => onSort('name')}
        >
          Name {getSortDirection('name')}
        </th>
        <th 
          className={getHeaderClasses('email')} 
          onClick={() => onSort('email')}
        >
          Email {getSortDirection('email')}
        </th>
        <th 
          className={getHeaderClasses('role')} 
          onClick={() => onSort('role')}
        >
          Role {getSortDirection('role')}
        </th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;