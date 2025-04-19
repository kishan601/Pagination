/**
 * Utility functions for pagination
 */

/**
 * Get the data for the current page
 * @param {Array} data - The full data array
 * @param {number} currentPage - The current page number (1-based)
 * @param {number} perPage - Number of items per page
 * @returns {Array} - The data for the current page
 */
export const getPaginatedData = (data, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };
  
  /**
   * Calculate the total number of pages
   * @param {number} totalItems - The total number of items
   * @param {number} perPage - Number of items per page
   * @returns {number} - The total number of pages
   */
  export const getTotalPages = (totalItems, perPage) => {
    return Math.ceil(totalItems / perPage);
  };
  
  /**
   * Generate an array of page numbers for pagination
   * @param {number} currentPage - The current page number
   * @param {number} totalPages - The total number of pages
   * @returns {Array} - Array of page numbers to display
   */
  export const getPageNumbers = (currentPage, totalPages) => {
    // Always show first and last page
    // Show 2 pages before and after current page when possible
    const pageNumbers = [];
    
    // Add pages around current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageNumbers.push(i);
    }
    
    // Ensure first page is included
    if (!pageNumbers.includes(1)) {
      pageNumbers.unshift(1);
      // Add ellipsis if there's a gap
      if (pageNumbers[1] > 2) {
        pageNumbers.splice(1, 0, '...');
      }
    }
    
    // Ensure last page is included
    if (!pageNumbers.includes(totalPages) && totalPages > 1) {
      // Add ellipsis if there's a gap
      if (pageNumbers[pageNumbers.length - 1] < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };