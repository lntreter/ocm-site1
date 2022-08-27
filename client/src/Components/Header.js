import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const Header = ({user, setUser}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("user") && !user){
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  } , [user]);
  return (
    <Navbar collapseOnSelect className="py-4" bg="primary" >
      <Container>
        <Navbar.Brand className="text-white" href="/" >
            <b>OCM Holding</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" href="/duyurular">Duyurular</Nav.Link>
            <Nav.Link className="text-white" href="/iletisim" >İletişim</Nav.Link>
            <NavDropdown title={<span className="text-white">Hakkımızda</span>}>
              <NavDropdown.Item >OCM Nedir?</NavDropdown.Item>
              <NavDropdown.Item >
                Neler Yaparız
              </NavDropdown.Item>
              <NavDropdown.Item>Ekibimiz</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {
          user ? <Button onClick={(e) => {
            localStorage.removeItem("user");
            setUser(null);
          }}>Çıkış yap</Button>:
          
          <Button 
          onClick={(e) => {
            e.preventDefault();
            navigate("/auth");
          }}
          variant="outline-light">
          Giriş
        </Button>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;