import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate, Link } from 'react-router-dom';
import transactionDetailsAdmin from "./TransactionDetailsAdmin";
import {maskedCreditCard} from "../Utils";

const UserTransactions = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();
  const token = Cookies.get('token');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/users/${id}?limit=5&page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setTransactions(response.data.paginated_transactions);
        setTotalPages(Math.ceil(response.data.total / 5));
      } catch (error) {
        console.error('Erro ao buscar usuário e transações', error.response ? error.response.data : error.message);
      }
    };

    fetchUserAndTransactions();
  }, [id, token, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1)
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="user-show">
      <h2>Perfil do Usuário</h2>
      <div className="user-information">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <h2>Transações</h2>
      {transactions?.length > 0 ? (
        <ul>
          {transactions.map(transaction => (
            <Link to={`admin/transaction/${transaction.id}`} key={transaction.id}>
              <li className="transaction-card bg-white rounded-lg shadow p-4 mb-4">
                <div className="user-details">
                  <p>ID: {transaction.id}</p>
                  <p>Nº do cartão: </p>
                  <p>{maskedCreditCard(transaction.card_number)}</p>
                </div>
                <div className="user-details">
                  <p>Valor: {transaction.amount}</p>
                  <p>Data de Vencimento: </p>
                  <p>{transaction.card_expiry_month}/{transaction.card_expiry_year}</p>
                </div>
                <div className="user-details">
                  <p>CVV: {transaction.card_cvv}</p>
                  <p>Status: {transaction.status}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>O usuário ainda não efetuou transações.</p>
      )}
      <button onClick={handlePreviousPage} disabled={page === 1}>Página Anterior</button>
      <button onClick={handleNextPage} disabled={page === totalPages}>Próxima Página</button>
    </div>
  );
};

export default UserTransactions;