import React, { useContext, useState, useEffect } from 'react';

const {
  REACT_APP_GITHUB_CLIENT_ID,
} = process.env;

const { localStorage } = window

export const startOAuthFlow = (type, integration) => {
  localStorage.setItem('pendingIntegration', JSON.stringify(integration))

  switch(type) {
    case 'github':
      let uri = `https://github.com/login/oauth/authorize`
      let redirect = `${window.location.origin}/integrations/github/callback`
      window.location = `${uri}?login&redirect_uri=${redirect}&client_id=${REACT_APP_GITHUB_CLIENT_ID}`
    break;
    default:
  }
}

export const OAuthContext = React.createContext();
export const useOAuth = () => useContext(OAuthContext)
export const OAuthProvider = ({
  children,
  ...initOptions
}) => {
  const [code, setCode] = useState();
  const [pendingIntegration, setPendingIntegration] = useState();


  useEffect(() => {
    const onRedirectCallback = async () => {
      const { searchParams } = new URL(window.location);
      const code = searchParams.get('code');
      const integrationPending = Boolean(localStorage.getItem('pendingIntegration'));
      if (integrationPending) {
        const integration = JSON.parse(localStorage.getItem('pendingIntegration'));
        setPendingIntegration(integration);
        localStorage.removeItem('pendingIntegration');
      }

      setCode(code)
      window.history.replaceState({}, document.title, '/');
    }

    const initOAuth = async () => {
      const { pathname, search } = window.location;
      const path = /\/integrations\/.*\/callback$/;
      if (path.test(pathname) && search.includes("code=")) {
        onRedirectCallback(setCode);
      }
    };
    initOAuth();
  }, []);

  return (
    <OAuthContext.Provider
      value={{
        code,
        pendingIntegration,
        setPendingIntegration,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
};
