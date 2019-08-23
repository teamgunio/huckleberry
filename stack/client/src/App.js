import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import logo from './logo.svg';
import './App.css';

import { version } from '../package.json';

const { REACT_APP_API_BASE } = process.env;

const AppContext = React.createContext('app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiVersion: null,
    };
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    try {
      const res = await fetch(`${REACT_APP_API_BASE}/version`)
      const version = await res.text()
      this.setState({
        apiVersion: version
      });
      const socket = openSocket(`${REACT_APP_API_BASE}/rtm/events`, { path: '/api/rtm' });
      socket.on('events', res => console.log('event',res));
      socket.on('connect', () => {
        setInterval(() => {
          socket.emit('events', { test: 'test' });
        }, 1000)
      })

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { apiVersion } = this.state
    return (
      <AppContext.Provider value={apiVersion}>
        <div className="App">
          <header className="App-header">
            <div className="App-banner">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="App-label">Huckleberry</div>
            </div>
          </header>
          <main className="App-main">
            <div className="App-splash">
              <h1>The onboarding assistant that does your dirty work.</h1>
              <h2>Coming Soon.</h2>
              <h3>A <a className="pill" href="https://gun.io">Gun.io</a> Production</h3>
            </div>
          </main>
          <footer className="App-footer">
            <div className="App-info">
              <div className="copywrite">&copy; 2019 Gun.io, Inc.</div>
              <div className="version">
                Client v{version}
                { apiVersion && ` | Server v${apiVersion}` }
              </div>
            </div>
          </footer>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
