import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand, Nav } from 'reactstrap'

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante ConFusion</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
