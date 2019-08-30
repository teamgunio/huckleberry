import React, { useContext, useState, useEffect } from 'react';

export const OAuthContext = React.createContext();
export const useOAuth = () => useContext(OAuthContext)
export const OAuthProvider = ({
  children,
  ...initOptions
}) => {
  const [code, setCode] = useState();

  useEffect(() => {
    const onRedirectCallback = async () => {
      const { searchParams } = new URL(window.location);
      const code = searchParams.get('code');
      setCode(code)
      window.history.replaceState({}, document.title, '/');
    }

    const initOAuth = async () => {
      const { pathname, search } = window.location;
      if (pathname === '/integrations/callback' && search.includes("code=")) {
        onRedirectCallback(setCode);
      }
    };
    initOAuth();
  }, []);

  return (
    <OAuthContext.Provider
      value={{
        code,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
};
