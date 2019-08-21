import React from 'react';
import logo from './logo.svg';
import './App.css';

import { version } from '../package.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-banner">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-label">Huckleberry</div>
        </div>
      </header>
      <main className="App-main">
        <div></div>
      </main>
      <footer className="App-footer">
        <div className="App-info">
          <div className="copywrite">&copy; 2019 Gun.io, Inc.</div>
          <div className="version">v{version}</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
