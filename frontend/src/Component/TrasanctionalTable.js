import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../Services/api';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await fetchTransactions(month, search, page, 10);
      setTransactions(data.transactions);
      setTotalPages(Math.ceil(data.count / 10));
      setError(null); // Clear any existing errors
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      setTransactions([]); // Clear data if fetching fails
      setTotalPages(1); // Reset pagination
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, search, page]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>{tx.description}</td>
                <td>{tx.price}</td>
                <td>{tx.sold ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
