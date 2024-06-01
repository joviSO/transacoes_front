import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="light">
      <Container>
        <Navbar.Text>
          &copy; {new Date().getFullYear()} Transações App
        </Navbar.Text>
        <Nav className="ml-auto">
          <Nav.Link href="/privacy-policy">Política de Privacidade</Nav.Link>
          <Nav.Link href="/terms-of-service">Termos de Serviço</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;