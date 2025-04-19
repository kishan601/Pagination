import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import Pagination from './components/Pagination/Pagination';
import useEmployeeData from './hooks/useEmployeeData';
import usePagination from './hooks/usePagination';
import useDebounce from './hooks/useDebounce';

import './styles/global.css';

const App = () => {
  const { 
    employees, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    sortConfig, 
    handleSort, 
    selectedEmployees, 
    toggleSelectEmployee, 
    toggleSelectAll, 
    deleteEmployees, 
    updateEmployee,
    setDebouncedSearchTerm
  } = useEmployeeData();
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  // Use the debounced search term
  useEffect(() => {
    setDebouncedSearchTerm(debouncedSearch);
  }, [debouncedSearch, setDebouncedSearchTerm]);
  
  const { 
    currentPage, 
    totalPages,
    currentData: paginatedEmployees,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    itemsPerPage,
    changeItemsPerPage,
    totalItems 
  } = usePagination(employees);
  
  return (
    <ThemeProvider>
      <Layout 
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      >
        <h2 className="mt-2 mb-2">Employee Management</h2>
        
        <EmployeeTable
          employees={paginatedEmployees}
          selectedEmployees={selectedEmployees}
          toggleSelectEmployee={toggleSelectEmployee}
          toggleSelectAll={toggleSelectAll}
          deleteEmployees={deleteEmployees}
          updateEmployee={updateEmployee}
          sortConfig={sortConfig}
          onSort={handleSort}
          loading={loading}
          error={error}
        />
        
        {!loading && !error && employees.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToFirstPage={goToFirstPage}
            goToLastPage={goToLastPage}
            itemsPerPage={itemsPerPage}
            changeItemsPerPage={changeItemsPerPage}
            totalItems={totalItems}
          />
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;