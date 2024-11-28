import React, { useState } from "react";
import { Col, Card, Modal, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal

  const handleShow = () => setShowModal(true); // Tampilkan modal
  const handleClose = () => setShowModal(false); // Tutup modal

  const handlePilih = () => {
    masukKeranjang(menu); // Tambahkan menu ke keranjang
    handleClose(); // Tutup modal setelah memilih
  };

  return (
    <>
      {/* Kartu Menu */}
      <Col md={4} xs={6} className="mb-4">
        <Card className="shadow" onClick={handleShow}>
          <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
          <Card.Body>
            <Card.Title>
              {menu.nama} <strong>({menu.kode})</strong>
            </Card.Title>
            <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Modal untuk Detail Makanan */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Makanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            {/* Gambar Makanan */}
            <img src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} alt={menu.nama} style={{ maxWidth: "100%", maxHeight: "200px", marginBottom: "15px" }} />
          </div>
          {/* Nama Makanan */}
          <h4>{menu.nama}</h4>
          {/* Harga */}
          <p>
            <strong>Harga:</strong> Rp. {numberWithCommas(menu.harga)}
          </p>
          {/* Deskripsi */}
          <p>
            <strong>Deskripsi:</strong> {menu.deskripsi || "Tidak ada deskripsi tersedia."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kembali
          </Button>
          <Button variant="primary" onClick={handlePilih}>
            Pilih
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Menus;
