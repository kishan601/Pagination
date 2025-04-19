import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import Pagination from './components/Pagination/Pagination';
import LoadingSpinner from './components/common/LoadingSpinner';
import useEmployeeData from './hooks/useEmployeeData';
import './App.css';

function App() {
  const ITEMS_PER_PAGE = 10;
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    employees,
    totalEmployees,
    currentPage,
    totalPages,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    handleSearch
  } = useEmployeeData(ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Data Table</h1>
      </header>
      
      <main className="app-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email or role..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <EmployeeTable 
              employees={employees} 
              isLoading={isLoading} 
              error={error}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={goToPreviousPage}
              onNextPage={goToNextPage}
              onPageChange={goToPage}
              totalItems={totalEmployees}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;