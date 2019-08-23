import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useAuth0 } from "../react-auth0-wrapper";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="App-navbar">
      {!isAuthenticated && (
        <Button
          className={classes.button}
          onClick={() => loginWithRedirect({})}
        >
          Log in
        </Button>
      )}

      { isAuthenticated &&
        <Button
          className={classes.button}
          onClick={() => logout()}
        >
          Log out
        </Button>
      }
    </div>
  );
};

export default NavBar;