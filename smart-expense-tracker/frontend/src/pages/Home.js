
import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const client = createClient(token);
    const res = await client.get('/expenses');
    setExpenses(res.data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e._id}>{e.title} - {e.amount} ({e.category})</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
