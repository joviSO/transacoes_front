import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Navbar as BootstrapNavbar} from 'react-bootstrap';
import Cookies from 'js-cookie';

const Navbar = () => {
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const token = Cookies.get('token');

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    window.location.reload();
  };

  if (!user) {
    return null;
  }
  return (
    <BootstrapNavbar className="vh-17" expand="lg" bg="dark" variant="dark">
      <Row className="w-100">
        <Col xs={11}>
          <Link className="navbar-brand me-3" to="/">Home</Link>
          {user.admin && <Link className="navbar-brand me-3" to="/user-list">Lista de usuarios</Link>}
        </Col>
        <Col xs={1}>
          {token && <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>}
        </Col>
      </Row>
    </BootstrapNavbar>
  );
};

export default Navbar;