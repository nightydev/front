// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState(1); // Suponemos un usuario inicial

  useEffect(() => {
    // Obtener los gastos
    axios.get('http://localhost:3000/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error(error));
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/expenses', {
      id_usuario: userId,
      categoria: category,
      monto: parseFloat(amount),
    })
      .then(response => {
        setExpenses([...expenses, response.data]);
        setCategory('');
        setAmount('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Registro de Gastos</h1>
      <form onSubmit={addExpense} style={{ marginBottom: "20px" }}>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Monto:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Agregar Gasto</button>
      </form>
      <h2>Lista de Gastos</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id_gasto}>
            {expense.categoria}: ${expense.monto} - {new Date(expense.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
