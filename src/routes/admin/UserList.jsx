import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');

      const response = await axios.get('http://localhost:3001/admin/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Erro ao buscar usuários');
      console.error('Erro ao buscar usuários', error.response ? error.response.data : error.message);
    }
  };

  const promoteUser = async (userId) => {
    try {
      const token = Cookies.get('token');

      await axios.put(`http://localhost:3001/admin/users/${userId}/promote`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.error('Erro ao promover usuário', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="user-show">
      <h2>Lista de Usuários</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="user-list-table">
        <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/admin/user-transactions/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => promoteUser(user.id)}>Promover a Admin</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;