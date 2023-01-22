import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from "./Home/Home"
import Enseignat from "./component/Enseignat/Enseignat"
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Etudiant</Link>
          <Link to="/Enseignat">Enseignat</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Enseignat" element={<Enseignat />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
