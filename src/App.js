import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";
import Profil from "./pages/Profil";
import About from "./pages/About";
import Welcome from "./pages/Welcome";

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Tampilkan Navbar hanya jika bukan di halaman Welcome (root path "/") */}
      {location.pathname !== "/" && <NavbarComponent />}

      <main>
        <Routes>
          <Route path="/" element={<Welcome />} /> {/* Welcome sebagai halaman utama di root */}
          <Route path="/home" element={<Home />} /> {/* Home pada path /home */}
          <Route path="/sukses" element={<Sukses />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
};

// Bungkus App dengan BrowserRouter di AppWrapper agar useLocation dapat digunakan
const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
