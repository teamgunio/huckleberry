import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { version } from '../package.json';

import { useAuth0 } from "./react-auth0-wrapper";
import NavBar from './components/NavBar';
import Loading from './components/Loading';
import Splash from './components/Splash';

import Dashboard from './views/Dashboard';

import logo from './logo.svg';
import './App.css';


const { REACT_APP_API_BASE } = process.env;

const AppContext = React.createContext('app');

const AppComponent = (props) => {
  const { apiVersion, ws } = props
  const {
    loading,
    isAuthenticated,
    // loginWithRedirect,
    // logout
  } = useAuth0();

  if (isAuthenticated) {
    ws()
  }

  return (
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
        <AppComponent apiVersion={apiVersion} ws={this.ws}/>
      </AppContext.Provider>
    );
  }
}





export default App;
