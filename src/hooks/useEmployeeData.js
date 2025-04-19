import { useState, useEffect } from 'react';
import { fetchEmployees } from '../services/api';
import { getPaginatedData, getTotalPages } from '../utils/paginationUtils';

/**
 * Custom hook to fetch and manage employee data with pagination
 * @param {number} perPage - Number of items per page
 * @returns {Object} - Employee data state and handlers
 */
const useEmployeeData = (perPage = 10) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate total pages
  const totalPages = getTotalPages(filteredEmployees.length, perPage);
  
  // Get current page data
  const currentEmployees = getPaginatedData(filteredEmployees, currentPage, perPage);

  // Fetch employee data on component mount
  useEffect(() => {
    const getEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = employees.filter(
        employee => 
          employee.name.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.role.toLowerCase().includes(term)
      );
      setFilteredEmployees(filtered);
    }
    
    // Reset to first page when search term changes
    setCurrentPage(1);
  }, [searchTerm, employees]);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    const pageNumber = parseInt(page, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Search handler
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return {
    employees: currentEmployees,
    totalEmployees: filteredEmployees.length,
    currentPage,
    totalPages,
    isLoading,
    error,
    searchTerm,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    handleSearch
  };
};

export default useEmployeeData;