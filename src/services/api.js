/**
 * Service to handle API requests for employee data
 */

const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

/**
 * Fetch employee data from the API
 * @returns {Promise<Array>} - Array of employee objects
 */
export const fetchEmployees = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch employees: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
  }
};