import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

export default function Navbars() {
  
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" sticky='top' bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Louhan</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
