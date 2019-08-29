import React from 'react';
import TestRenderer from "react-test-renderer";

import { Auth0Context } from "./contexts/auth0";
import App from './App';

it('renders without crashing', () => {
  const isAuthenticated = false;
  const user = {};
  const loading = false;
  const popupOpen = false;
  const loginWithPopup = false;
  const handleRedirectCallback = () => {};
  const logout = () => {};

  TestRenderer.create(
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        logout,
      }}
    >
      <App />
    </Auth0Context.Provider>
  );
});
