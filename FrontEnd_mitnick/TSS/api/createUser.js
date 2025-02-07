import axios from 'axios';
export const createUser = async (userData) => {
    const API_URL = 'http://10.0.2.2:3000/api/orders'; // Replace with your actual API endpoint
  
    try {
      const response = await axios.post(API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error creating user:', error.message);
      return { success: false, message: error.message };
    }
  };
  