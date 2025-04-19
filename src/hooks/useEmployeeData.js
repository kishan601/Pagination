import { useState, useEffect, useCallback } from 'react';
import { fetchEmployees } from '../services/api';
import { filterEmployees } from '../utils/filterUtils';
import { sortEmployees } from '../utils/sortUtils';

const useEmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  
  // Fetch employees data
  useEffect(() => {
    const getEmployees = async () => {
      setLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    getEmployees();
  }, []);
  
  // Apply search and sort whenever dependencies change
  useEffect(() => {
    let result = [...employees];
    
    // Apply search filter with debounced search term
    if (debouncedSearchTerm) {
      result = filterEmployees(result, debouncedSearchTerm);
    }
    
    // Apply sorting
    if (sortConfig) {
      result = sortEmployees(result, sortConfig);
    }
    
    setFilteredEmployees(result);
    
    // Clear selections when filter/sort changes
    setSelectedEmployees([]);
  }, [employees, debouncedSearchTerm, sortConfig]);
  
  // Sort handler
  const handleSort = useCallback((key) => {
    setSortConfig(prevConfig => {
      if (!prevConfig || prevConfig.key !== key) {
        return { key, direction: 'ascending' };
      }
      
      if (prevConfig.direction === 'ascending') {
        return { key, direction: 'descending' };
      }
      
      return null; // Reset sorting if clicked third time
    });
  }, []);
  
  // Select/deselect handlers
  const toggleSelectEmployee = useCallback((id) => {
    setSelectedEmployees(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(empId => empId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  }, []);
  
  const toggleSelectAll = useCallback((currentPageEmployees) => {
    const currentPageIds = currentPageEmployees.map(emp => emp.id);
    
    setSelectedEmployees(prevSelected => {
      // Check if all current page items are already selected
      const allSelected = currentPageIds.every(id => prevSelected.includes(id));
      
      if (allSelected) {
        // Deselect all current page items
        return prevSelected.filter(id => !currentPageIds.includes(id));
      } else {
        // Select all current page items that aren't already selected
        const newSelections = currentPageIds.filter(id => !prevSelected.includes(id));
        return [...prevSelected, ...newSelections];
      }
    });
  }, []);
  
  // Employee CRUD operations
  const deleteEmployees = useCallback((ids) => {
    setEmployees(prevEmployees => 
      prevEmployees.filter(emp => !ids.includes(emp.id))
    );
    setSelectedEmployees(prevSelected => 
      prevSelected.filter(id => !ids.includes(id))
    );
  }, []);
  
  const updateEmployee = useCallback((id, updatedData) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === id ? { ...emp, ...updatedData } : emp
      )
    );
  }, []);
  
  return {
    employees: filteredEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    setDebouncedSearchTerm,
    sortConfig,
    handleSort,
    selectedEmployees,
    toggleSelectEmployee,
    toggleSelectAll,
    deleteEmployees,
    updateEmployee,
    allEmployees: employees
  };
};

export default useEmployeeData;