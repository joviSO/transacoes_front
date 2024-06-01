  import React, { createContext, useState, useEffect, useContext } from 'react';
  import Cookies from 'js-cookie';

  export const AuthContext = createContext();

  export const useAuth = () => {
    return useContext(AuthContext);
  };

  export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
      const storedToken = Cookies.get('token');
      const storedUser = Cookies.get('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }, []);

    const setAuthInfo = ({ token, user }) => {
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
    };

    return (
      <AuthContext.Provider value={{ token, user, setAuthInfo, setToken, setUser,
        showLogoutModal, setShowLogoutModal }}>
        {children}
      </AuthContext.Provider>
    );
  };