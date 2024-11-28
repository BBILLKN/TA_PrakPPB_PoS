import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  // Fungsi untuk logout
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn"); // Hapus status login dari sessionStorage
    navigate("/"); // Arahkan kembali ke halaman Welcome
  };

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        {/* Navbar.Brand dengan Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/iconPoS.png" // Path logo di dalam folder public
            alt="Logo"
            width="30" // Sesuaikan ukuran logo
            height="30"
            className="d-inline-block align-top"
            style={{ marginRight: "10px" }} // Menambahkan jarak antara logo dan teks
          />
          <strong>Simple</strong> PoS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Jual
            </Nav.Link>
            <Nav.Link as={Link} to="/profil">
              Profil
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          {/* Tombol Logout di bagian kanan */}
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
