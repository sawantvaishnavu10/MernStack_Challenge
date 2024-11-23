import axios from 'axios';

// Base API instance
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchTransactions = async (month, search, page, perPage) => {
  try {
    const response = await API.get('/transactions', {
      params: { month, search, page, perPage },
    });
    return response;
  } catch (error) {
    console.error('Error fetching transactions:', error.response || error.message);
    throw error; // Rethrow error for component to handle
  }
};


export const fetchStatistics = async (month) => {
  try {
    const response = await API.get('/statistics', { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error.response || error.message);
    throw error;
  }
};
export const fetchBarChart = async (month) => {
  try {
    const response = await API.get('/bar-chart', { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data:', error.response || error.message);
    throw error;
  }
};


export const fetchPieChart = async (month) => {
  try {
    const response = await API.get('/pie-chart', { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error.response || error.message);
    throw error;
  }
};