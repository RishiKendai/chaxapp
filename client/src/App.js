import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './pages/Chat';
import Login from './pages/Login';


import Register from './pages/Register';
import SetProfile from './pages/SetProfile';
import Test from './pages/Test';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setProfile" element={<SetProfile />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
