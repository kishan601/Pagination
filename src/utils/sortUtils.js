export const sortEmployees = (employees, sortConfig) => {
    if (!sortConfig || !sortConfig.key) return employees;
    
    const { key, direction } = sortConfig;
    const multiplier = direction === 'ascending' ? 1 : -1;
    
    return [...employees].sort((a, b) => {
      const aValue = a[key].toLowerCase();
      const bValue = b[key].toLowerCase();
      
      if (aValue < bValue) return -1 * multiplier;
      if (aValue > bValue) return 1 * multiplier;
      return 0;
    });
  };