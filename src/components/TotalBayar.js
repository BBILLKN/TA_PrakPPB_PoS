import React, { Component, createRef } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

class TotalBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showConfirmModal: false, // Modal kedua untuk konfirmasi kembalian
      cash: '', // Ubah cash menjadi string kosong
      change: 0,
    };
    this.cashInputRef = createRef(); // Referensi untuk input Cash
  }

  componentDidMount() {
    // Menambahkan event listener untuk mendeteksi tombol Enter pada komponen
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // Menghapus event listener ketika komponen di-unmount
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!this.state.showModal && !this.state.showConfirmModal) {
        // Jika modal belum terbuka, tekan Enter untuk membuka modal pertama
        this.handleShowModal();
      } else if (this.state.showModal && this.state.change >= 0) {
        // Jika modal pertama terbuka dan jumlah cash mencukupi, klik "Bayar"
        this.handleBayar();
      } else if (this.state.showConfirmModal) {
        // Jika modal kedua terbuka, klik "Next"
        this.handleNext();
      }
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: true }, () => {
      // Fokus ke input Cash setelah modal terbuka
      if (this.cashInputRef.current) {
        this.cashInputRef.current.focus();
      }
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, cash: '', change: 0 });
  };

  handleCashChange = (e) => {
    const cash = e.target.value ? parseInt(e.target.value, 10) : ''; // Tetap string kosong jika input kosong
    const change = cash ? cash - this.calculateTotal() : 0;
    this.setState({ cash, change });
  };

  calculateTotal = () => {
    return this.props.keranjangs.reduce((result, item) => result + item.total_harga, 0);
  };

  // Handle saat pengguna mengklik "Bayar" pada modal pertama
  handleBayar = () => {
    const totalBayar = this.calculateTotal();
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.setState({ showModal: false, showConfirmModal: true }); // Tampilkan modal konfirmasi kedua
    });
  };

  // Handle saat pengguna mengklik tombol "Next" pada modal kedua
  handleNext = () => {
    this.setState({ showConfirmModal: false });
    this.props.navigate('/sukses');
  };

  render() {
    const totalBayar = this.calculateTotal();
    const { showModal, showConfirmModal, cash, change } = this.state;

    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={this.handleShowModal}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={this.handleShowModal}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Modal Pertama untuk Input Cash */}
        <Modal show={showModal} onHide={this.handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Masukkan Jumlah Uang (Cash)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="cashInput">
              <Form.Label>Total Bayar: Rp. {numberWithCommas(totalBayar)}</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan jumlah uang yang dibayar"
                value={cash}
                onChange={this.handleCashChange}
                ref={this.cashInputRef} // Tambahkan ref untuk input Cash
              />
            </Form.Group>
            <h5 className="mt-3">
              Kembalian: Rp. {numberWithCommas(change >= 0 ? change : 0)}
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={this.handleBayar}
              disabled={change < 0} // Disable jika cash kurang dari total bayar
            >
              Bayar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Kedua untuk Konfirmasi Kembalian */}
        <Modal show={showConfirmModal} onHide={() => this.setState({ showConfirmModal: false })} centered>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h4>Kembalian: </h4>
          <h1>Rp. {numberWithCommas(change >= 0 ? change : 0)}</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleNext}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// Komponen pembungkus untuk memasukkan navigate ke dalam TotalBayar
function TotalBayarWrapper(props) {
  const navigate = useNavigate();
  return <TotalBayar {...props} navigate={navigate} />;
}

export default TotalBayarWrapper;
