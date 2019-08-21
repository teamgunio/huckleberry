import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-banner">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-label">Huckleberry</div>
        </div>
      </header>
    </div>
  );
}

export default App;
