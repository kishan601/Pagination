import React, { useState } from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  goToPage, 
  goToNextPage, 
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  itemsPerPage,
  changeItemsPerPage,
  totalItems
}) => {
  const [pageInputValue, setPageInputValue] = useState(currentPage.toString());
  
  const handlePageInputChange = (e) => {
    setPageInputValue(e.target.value);
  };
  
  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(pageInputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      goToPage(page);
    } else {
      setPageInputValue(currentPage.toString());
    }
  };
  
  const handleItemsPerPageChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    changeItemsPerPage(newValue);
  };
  
  // Calculate start and end item numbers
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if we have 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      // Add pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis and first/last page indicators
      if (startPage > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      
      if (endPage < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button 
          onClick={goToFirstPage}
          disabled={currentPage === 1}
          className="btn pagination-btn"
          aria-label="First page"
        >
          ⟪
        </button>
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          className="btn pagination-btn"
          aria-label="Previous page"
        >
          Previous
        </button>
        
        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
            ) : (
              <button 
                key={`page-${page}`}
                onClick={() => goToPage(page)}
                className={`btn pagination-page-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
          className="btn pagination-btn"
          aria-label="Next page"
        >
          Next
        </button>
        <button 
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
          className="btn pagination-btn"
          aria-label="Last page"
        >
          ⟫
        </button>
      </div>
      
      <div className="pagination-info">
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Items per page: </label>
          <select 
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        
        <div className="go-to-page">
          <form onSubmit={handlePageInputSubmit}>
            <label htmlFor="goToPage">Go to page: </label>
            <input 
              id="goToPage"
              type="number" 
              min="1"
              max={totalPages}
              value={pageInputValue}
              onChange={handlePageInputChange}
            />
            <button type="submit" className="btn btn-sm">Go</button>
          </form>
        </div>
        
        <div className="pagination-summary">
          Showing {startItem} to {endItem} of {totalItems} items
        </div>
      </div>
    </div>
  );
};

export default Pagination;