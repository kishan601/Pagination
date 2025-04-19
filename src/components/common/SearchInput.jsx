import React from 'react';

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          className="clear-search" 
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;