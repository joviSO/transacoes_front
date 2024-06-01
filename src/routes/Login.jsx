import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreateUserFormModal from '../components/CreateUserFormModal';

const Login = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();
 const navigate = useNavigate();
 const { setAuthInfo } = useAuth();
 const { user } = useAuth();

 useEffect(() => {
  if (user) {
   setTimeout(() => {
    navigate(`/user/${user.id}`);
   }, 500);
  }
 }, [user, navigate]);

 const onSubmit = async (data) => {
  try {
   const response = await axios.post('http://localhost:3001/auth/login', data, {
    headers: {
     'Content-Type': 'application/json',
    },
   });
   setAuthInfo({ token: response.data.token, user: response.data.user });
  } catch (error) {
   console.error('Erro ao fazer login', error.response ? error.response.data : error.message);
  }
 };

 return (
   <div className="app-container">
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        {...register('email', { required: true })}
      />
      {errors.email && <span>Email é obrigatório</span>}
     </div>
     <div className="form-group">
      <label>Senha</label>
      <input
        type="password"
        {...register('password', { required: true })}
      />
      {errors.password && <span>Senha é obrigatória</span>}
     </div>
     <button class='btn btn-primary' type="submit">Login</button>
    </form>
    <p>não tem conta?<CreateUserFormModal /></p>
   </div>
 );
};

export default Login;