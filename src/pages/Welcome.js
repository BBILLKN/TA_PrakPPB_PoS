import React, { useEffect, useState } from "react";
import { Button, Container, Image, Form, Alert, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const goToHome = () => {
    sessionStorage.setItem("isLoggedIn", "true"); // Simpan status login
    navigate("/home");
  };

  const validateLogin = (username, password) => {
    return username === "bbillkn" && password === "17112003";
  };

  const handleLogin = () => {
    if (validateLogin(username, password)) {
      setLoginError(false);
      goToHome();
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [username, password, navigate]);

  return (
    <Container className="text-center mt-5">
      <Image src="/assets/welcome.jpg" width="500" className="mb-4" />
      <h1>Selamat Datang di Simple PoS</h1>
      <p>Aplikasi kasir yang membantu mengelola transaksi dengan mudah dan cepat.</p>

      <Card style={{ maxWidth: "500px", margin: "0 auto", marginTop: "50px", padding: "20px" }}>
        <Card.Body>
          <Card.Title className="mb-4">LOGIN</Card.Title>
          {loginError && <Alert variant="danger">Username atau password salah, silakan coba lagi.</Alert>}
          <Form>
            <Form.Group as={Row} controlId="formUsername" className="mb-3">
              <Form.Label column sm="4" className="text-end">
                Username:
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="Masukkan username Anda" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPassword" className="mb-3">
              <Form.Label column sm="4" className="text-end">
                Password:
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Masukkan password Anda" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Col>
            </Form.Group>
            <Button variant="primary" size="lg" onClick={handleLogin} block>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Welcome;
