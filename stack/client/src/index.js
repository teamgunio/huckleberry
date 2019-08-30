import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Auth0Provider } from "./contexts/auth0";
import { OAuthProvider } from "./contexts/oauth";

const {
  NODE_ENV,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_CLIENT_ID,
} = process.env

// Force SSL Upgrade
if (NODE_ENV === 'production' && !/https/.test(window.location.protocol)) {
  window.location.href = window.location.href.replace('http:', 'https:');    
}

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : '/' //window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    client_id={REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={`${window.location.origin}/auth/callback`}
    onRedirectCallback={onRedirectCallback}
    audience={REACT_APP_AUTH0_AUDIENCE}
  >
    <OAuthProvider>
      <App />
    </OAuthProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
