import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState('');
  const { id: transactionId } = useParams();
  const user = JSON.parse(Cookies.get('user'));

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:3001/admin/transactions/${transactionId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response)
        setTransaction(response.data);
      } catch (err) {
        setError('Erro ao recuperar dados da transação');
        console.error(err);
      }
    };

    fetchTransactionData();
  }, [transactionId]);

  const handleApprove = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`http://localhost:3001/admin/transactions/${transaction.id}/approve`, {
        status: 'approved',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setTransaction({ ...transaction, status: 'completed' });
    } catch (err) {
      setError('Erro ao aprovar a transação');
      console.error(err);
    }
  };

  const handleReject = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`http://localhost:3001/admin/transactions/${transaction.id}/deny`, {
        status: 'rejected',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setTransaction({ ...transaction, status: "failed" });
    } catch (err) {
      setError('Erro ao recusar a transação');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!transaction) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Detalhes da Transação</h1>
      <p>ID: {transaction.id}</p>
      <p>Card Number: {transaction.card_number}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Expiry Date: {transaction.card_expiry_month}/{transaction.card_expiry_year}</p>
      <p>CVV: {transaction.card_cvv}</p>
      <p>Status: {transaction.status}</p>
      {user.admin && transaction.status === 'pending' && (
        <div>
          <button onClick={handleApprove}>Aprovar</button>
          <button onClick={handleReject}>Recusar</button>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;