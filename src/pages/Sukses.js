import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((item) => {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    // Menambahkan event listener untuk mendeteksi tombol Enter
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // Menghapus event listener ketika komponen di-unmount
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleBack(); // Memanggil fungsi navigasi ketika tombol Enter ditekan
    }
  };

  handleBack = () => {
    // Mengarahkan ke halaman /home menggunakan fungsi navigate
    this.props.navigate("/home");
  };

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="/assets/sukses.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/home">
          Kembali
        </Button>
      </div>
    );
  }
}

// Pembungkus komponen Sukses untuk menggunakan useNavigate
function SuksesWrapper(props) {
  const navigate = useNavigate();
  return <Sukses {...props} navigate={navigate} />;
}

export default SuksesWrapper;
