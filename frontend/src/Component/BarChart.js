import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchBarChart } from '../Services/api';
import { Bar } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barChartData = await fetchBarChart(month);
        console.log('Bar Chart Data:', barChartData);  // Log the fetched data
        if (Array.isArray(barChartData)) {
          setData(barChartData); // Only set if it is an array
        } else {
          console.error('Invalid data format', barChartData);
        }
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };
    fetchData();
  }, [month]);

  // Add a fallback if data is undefined or not an array
  if (!data || data.length === 0) {
    return <div>Loading or no data available</div>;
  }

  // Log the data to check if it is correctly populated
  console.log('Chart Data for Bar Chart:', data);

  const chartData = {
    labels: data.map((item) => item._id || 'Unknown'),  // Default value if _id is missing
    datasets: [
      {
        label: 'Items in Price Range',
        data: data.map((item) => item.count || 0),  // Default value if count is missing
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
