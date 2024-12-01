import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './BudgetEstimator.css';

const BudgetEstimator = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    if (category && amount) {
      setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
      setCategory('');
      setAmount('');
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          '#7CA982',
          '#E0EEC6',
          '#243E36',
          '#F1F7ED',
          '#FFB7B2',
          '#FCE38A',
        ],
        hoverBackgroundColor: [
          '#5c8b64',
          '#c9dab1',
          '#1e312b',
          '#d7f0da',
          '#ffa09e',
          '#fde172',
        ],
      },
    ],
  };

  return (
    <div className="budget-estimator">
      <h1>Budget Estimator</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Category (e.g., Transport)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="expense-list">
        {expenses.map((expense, index) => (
          <li className="expense-item" key={index}>
            <span>{expense.category}</span>
            <span>${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
      {expenses.length > 0 && (
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default BudgetEstimator;
