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

const Splash = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return (
    <div className="App-splash">
      <h1>The onboarding assistant that does your dirty work.</h1>
      <h2>Coming Soon.</h2>
      <h3>A <a className="pill" href="https://gun.io">Gun.io</a> Production</h3>
    </div>
  )
  else return (
    <div className="App-splash">
      <div>Welcome</div>
    </div>
  )

};

export default Splash;
