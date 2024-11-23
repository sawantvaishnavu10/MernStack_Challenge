import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchPieChart } from '../Services/api';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pieChartData = await fetchPieChart(month);
        console.log('Fetched Pie Chart Data:', pieChartData); // Log to inspect the data
        if (Array.isArray(pieChartData)) {
          setData(pieChartData); // Only set data if it's an array
        } else {
          console.error('Invalid data format', pieChartData); // Handle invalid data format
        }
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };
    fetchData();
  }, [month]);

  // Add a fallback if data is undefined or not an array
  if (!data || data.length === 0) {
    return <div>Loading or no data available</div>;
  }

  console.log('Chart Data for Pie Chart:', data); // Log the final data

  // Ensure that data is correctly structured before using .map()
  const chartData = {
    labels: data.map((item) => item._id || 'Unknown'), // Default value if _id is missing
    datasets: [
      {
        data: data.map((item) => item.count || 0), // Default value if count is missing
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
