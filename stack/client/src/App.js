import React, { Component } from 'react';
import { Router } from "react-router-dom";

import openSocket from 'socket.io-client';
import { version } from '../package.json';

import { useAuth0 } from "./react-auth0-wrapper";
import history from "./history";

import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Splash from './components/Splash';

import Dashboard from './views/Dashboard';

import logo from './logo.svg';
import './App.css';


const { REACT_APP_API_BASE } = process.env;

const AppContext = React.createContext('app');

const AppComponent = (props) => {
  const { apiVersion, ws, auth } = props
  const {
    loading,
    isAuthenticated,
    accessToken,
    // loginWithRedirect,
    // logout
  } = useAuth0();

  if (isAuthenticated && accessToken) {
    ws()
    auth(accessToken)
  }

  return (
    <Router history={history}>
    <div className="App">
      <header className="App-header">
        <div className="App-banner">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-label">Huckleberry</div>
        </div>
        <NavBar/>
      </header>
      <main className="App-main">
        { loading && <Loading /> }
        { !isAuthenticated && <Splash /> }
        { isAuthenticated && <Dashboard /> }
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
    </Router>
  );
};

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

  ws = () => {
    const socket = openSocket(`${REACT_APP_API_BASE}/rtm/events`, { path: '/api/rtm' });
    socket.on('events', res => console.log('event',res));
    // socket.on('connect', () => {
    //   setInterval(() => {
    //     socket.emit('events', { test: 'test' });
    //   }, 1000)
    // })
  }

  async auth(accessToken) {
    try {
      const res = await fetch(`${REACT_APP_API_BASE}/auth`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      const authd = await res.text()
      console.log(authd)
    } catch (err) {
      console.error(err);
    }
  }

  async load() {
    try {
      const res = await fetch(`${REACT_APP_API_BASE}/version`)
      const version = await res.text()
      this.setState({
        apiVersion: version
      });

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { apiVersion } = this.state
    return (
      <AppContext.Provider value={apiVersion}>
        <AppComponent apiVersion={apiVersion} ws={this.ws} auth={this.auth} />
      </AppContext.Provider>
    );
  }
}





export default App;
