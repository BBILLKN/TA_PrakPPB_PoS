import React from "react";
import { Container, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      {/* Gambar di Luar Card */}
      <img
        src="/assets/aboutus.jpg"
        alt="Tentang Kami"
        style={{
          width: "100%",
          maxWidth: "450px",
          height: "450px",
          objectFit: "cover",
          borderRadius: "10px", // Menambahkan border-radius agar gambar lebih rapi
          marginBottom: "20px", // Memberi jarak antara gambar dan card
        }}
      />

      {/* Card Tentang Aplikasi */}
      <Card style={{ width: "100%", maxWidth: "600px" }} className="shadow">
        <Card.Header as="h2" className="text-center">
          Tentang Aplikasi Kasir
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ textAlign: "justify" }}>
            Web aplikasi Simple Pos merupakan aplikasi kasir yang dirancang untuk membantu pengelolaan transaksi penjualan secara efisien dan efektif. Fitur utamanya yaitu pemrosesan pesanan.
          </Card.Text>
          <Card.Text style={{ textAlign: "justify" }}>Simple PoS ini sengaja di buat untuk memenuhi Project Tugas RPLBK.</Card.Text>
          <Card.Text>
            <strong>Versi:</strong> 1.0.0
          </Card.Text>
          <Card.Text>
            <strong>Developer:</strong>{" "}
            <a href="https://github.com/BBILLKN" target="_blank" rel="noopener noreferrer">
              github.com/BBILLKN
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
