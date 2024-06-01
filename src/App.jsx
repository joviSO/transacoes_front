import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateUserFormModal from "./components/CreateUserFormModal";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import UserList from './routes/admin/UserList';
import Login from './routes/Login';
import Home from "./routes/user/Home";
import { useAuth } from './context/AuthContext';
import TransactionDetails from "./routes/transaction/TranscationDetails";
import TransactionDetailsAdmin from "./routes/admin/TransactionDetailsAdmin";
import UserTransactions from "./routes/admin/UserTransactions";

const App = () => {
  const { token } = useAuth();

  return (
      <Router>
        <Navbar />
          <Routes>
            <Route
              path="/login"
              element={token ?  <Home /> : <Login />}
            />
            <Route
              path="/user-list"
              element={token ? <UserList /> : <Login />}
            />
            <Route
              path="/create-user"
              element={token ? <CreateUserFormModal /> : <Login />}
            />
            <Route
              path="/user/:id"
              element={token ? <Home /> : <Login />}
            />
            <Route
              path="/"
              element={token ?  <Home /> : <Login />}
            />
            <Route
              path="/home"
              element=<Home />
            />
            <Route
              path="/transaction/:id"
              element={token ? <TransactionDetails /> : <Login />}
            />
            <Route
              path="/admin/user-transactions/:id"
              element=<UserTransactions />
              />
            <Route
              path="admin/user-transactions/:id/admin/transaction/:id"
              element={token ? <TransactionDetailsAdmin /> : <Login />}
            />
          </Routes>
        <Footer />
      </Router>
  );
};

export default App;