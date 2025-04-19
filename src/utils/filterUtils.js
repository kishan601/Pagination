export const filterEmployees = (employees, searchTerm) => {
    if (!searchTerm) return employees;
    
    const term = searchTerm.toLowerCase().trim();
    
    return employees.filter(employee => 
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.role.toLowerCase().includes(term)
    );
  };