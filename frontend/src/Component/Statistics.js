import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../Services/api';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSale: 0,
    totalSold: 0,
    totalNotSold: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatistics(month);
        console.log('Fetched Statistics Data:', data);  // Log data to inspect
        if (data) {
          setStats({
            totalSale: data.totalSale || 0,  // Ensure defaults if undefined
            totalSold: data.totalSold || 0,
            totalNotSold: data.totalNotSold || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchData();
  }, [month]);

  // Log to check that stats is populated correctly
  console.log('Statistics Data:', stats);

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Sale Amount: {stats.totalSale}</p>
      <p>Total Sold Items: {stats.totalSold}</p>
      <p>Total Not Sold Items: {stats.totalNotSold}</p>
    </div>
  );
};

export default Statistics;

