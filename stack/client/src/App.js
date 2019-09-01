import React, { Component, useState, useEffect } from 'react';
import { Router } from "react-router-dom";

import { version } from '../package.json';

import history from './history';
import { useAuth0 } from './contexts/auth0';
import { AppProvider } from './contexts/app';
import { SocketProvider } from './contexts/socket';

import Loading from './components/Loading';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Splash from './components/Splash';

import Dashboard from './views/Dashboard';
import Skill from './views/Skill';

import logo from './logo.svg';
import './App.css';

const { REACT_APP_API_BASE } = process.env;

// const AppContext = React.createContext('app');

const AppComponent = (props) => {
  const { apiVersion, connect } = props
  const [ isConnected, setIsConnected ] = useState(false)
  const {
    loading,
    isAuthenticated,
    accessToken,
    user,
  } = useAuth0();

  useEffect(() => {
    if (!loading && isAuthenticated && !isConnected) {
      connect(accessToken, user).then(authd => setIsConnected(authd));
    }
  })

  return (
    <SocketProvider>
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
          { isAuthenticated === true && 
            <AppProvider>
              <PrivateRoute
                exact
                path={[
                  '/',
                  '/activities',
                  '/integrations',
                  '/integrations/*',
                  '/skills',
                  '/training',
                ]}
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path={[
                  '/skills/new',
                  '/skills/:id',
                ]}
                component={Skill}
              />
            </AppProvider>
          }
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
    </SocketProvider>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiVersion: null,
      connected: false,
    };
  }

  componentDidMount() {
    this.load();
  }

  async connect(accessToken, user) {
    const authd = await this.auth(accessToken, user);
    return authd
  }

  async auth(accessToken, profile) {
    try {
      let res = await fetch(`${REACT_APP_API_BASE}/user`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      let user = await res.json()
      if (!user.id) {
        res = await fetch(`${REACT_APP_API_BASE}/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ profile })
        })
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
      <AppComponent apiVersion={apiVersion} connect={this.connect.bind(this)} />
    );
  }
}





export default App;
