import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Nav } from 'reactstrap'
import Menu from './components/MenuComponent'
import { DISHES } from './shared/dishes.js'
import Main from './components/MainComponent'

function App() {
    return (
        <div className="App">
            <Main />
        </div>
    );
}

export default App;
