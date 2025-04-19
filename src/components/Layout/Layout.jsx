import React from 'react';
import Header from './Header';

const Layout = ({ children, searchValue, onSearchChange }) => {
  return (
    <div className="app-container">
      <Header searchValue={searchValue} onSearchChange={onSearchChange} />
      <main className="container">
        {children}
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>© 2025 Employee Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;