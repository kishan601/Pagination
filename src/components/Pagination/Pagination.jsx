import React from 'react';
import Button from '../common/Button';
import { getPageNumbers } from '../../utils/paginationUtils';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPreviousPage, 
  onNextPage, 
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems}` : '0'} results
      </div>
      
      <div className="pagination-controls">
        <Button 
          onClick={onPreviousPage} 
          disabled={currentPage === 1}
          className="button-text"
        >
          Previous
        </Button>
        
        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <Button 
                  onClick={() => onPageChange(page)} 
                  className={`button-page ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <Button 
          onClick={onNextPage} 
          disabled={currentPage === totalPages || totalPages === 0}
          className="button-text"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;