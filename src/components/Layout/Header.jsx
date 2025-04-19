import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import SearchInput from '../common/SearchInput';

const Header = ({ searchValue, onSearchChange }) => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Employee Dashboard</h1>
          </div>
          <div className="header-controls">
            <SearchInput 
              value={searchValue} 
              onChange={onSearchChange} 
              placeholder="Search by name, email or role..."
            />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;