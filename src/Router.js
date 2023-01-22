import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Enseignat from "./component/enseignat/Enseignat"
import Home from "./component/etudiant/Home"
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Etudiant</Link>
          <Link to="/enseignat">Enseignat</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enseignat" element={<Enseignat />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
