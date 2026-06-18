
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserManagement from '../src/pages/stockUser';

export default function App() {
  return (
   
    <BrowserRouter basename="/Sistem-GoTrip">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/usuarios" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
