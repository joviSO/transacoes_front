import { useState } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [token, setToken] = useState(Cookies.get('token'));

  const login = (newToken) => {
    Cookies.set('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  return { token, login, logout };
};