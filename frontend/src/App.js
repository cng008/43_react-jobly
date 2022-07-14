import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import NavBar from './NavBar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
