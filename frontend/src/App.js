import React, { useState } from 'react';
import TransactionsTable from '../src/Component/TrasanctionalTable';
import Statistics from '../src/Component/Statistics';
import BarChart from '../src/Component/BarChart';
import PieChart from '../src/Component/PieChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);
const App = () => {
  const [month, setMonth] = useState('3'); // Default: March

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
          (m, idx) => (
            <option key={idx} value={idx + 1}>
              {m}
            </option>
          )
        )}
      </select>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default App;
