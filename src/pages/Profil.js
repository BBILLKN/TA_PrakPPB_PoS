import React from "react";
import { Container, Card } from "react-bootstrap";

const Profil = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="shadow">
        
        {/* Header Profil */}
        <Card.Header as="h2" className="text-center">
          Profil Admin
        </Card.Header>
        
        {/* Foto Profil (Lingkaran) */}
        <Card.Body className="text-center">
          <Card.Img 
            src="/assets/fotoadmin.jpg" 
            alt="Foto Admin"
            style={{ 
              width: "200px", 
              height: "200px", 
              objectFit: "cover", 
              borderRadius: "50%", // Membuat gambar berbentuk lingkaran
              marginBottom: "20px" // Menambahkan jarak bawah
            }}
          />

          {/* Informasi Profil */}
          <Card.Text>
            <strong>Billy Khoiri Najwan</strong> 
          </Card.Text>
          <Card.Text>
            <strong>081222217121 (WA/Telp)</strong> 
          </Card.Text>
          <Card.Text>
            <strong>bbillkn1711@students.undip.ac.id</strong> 
          </Card.Text>
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profil;
