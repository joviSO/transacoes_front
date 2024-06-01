import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { maskedCreditCard } from "../Utils";
import CreateTransactionFormModal from "../../components/CreateTransactionFormModal";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const { token, user } = useAuth();
  const [ setError] = useState('');
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const openTransactionModal = () => {
    setIsTransactionModalOpen(true);
  };

  const handleSearch = () => {
    navigate(`/transaction/${searchId}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${user.id}?limit=5&page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Page:', page);
        setTransactions(response.data.paginated_transactions);
        setTotalPages(Math.ceil(response.data.total / 5));
      } catch (err) {
        setError('Desculpa mas você não tem acesso ou essa  transação não existe.');
        console.error(err);
      }
    };
    console.log('Page:', page);
    fetchUserData();
  }, [user, token, page]);

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
  } else {
    return (
      <div className="user-show">
        <h1>Detalhes do Usuário</h1>
        <div className="user-information">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
          <CreateTransactionFormModal isOpen={isTransactionModalOpen} setIsOpen={setIsTransactionModalOpen}/>
          <div className="search-group">
            <input className="form-control"
                   type="text"
                   value={searchId}
                   onChange={e => setSearchId(e.target.value)}
                   placeholder="Digite o ID da transação"
            />
            <button className="btn btn-light" onClick={handleSearch}>Enviar</button>
          </div>
        <h2>Transações</h2>
        <button className='btn btn-primary round-button' onClick={openTransactionModal}>Criar Transação</button>
        {transactions?.length > 0 ? (
          <ul>
            {transactions.map(transaction => (
              <Link to={`/transaction/${transaction.id}`} key={transaction.id}>
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
    )
      ;
  }
};

export default Home;