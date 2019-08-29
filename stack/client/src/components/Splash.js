import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import { useAuth0 } from "../contexts/auth0";

const useStyles = makeStyles(theme => ({
  splash: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const Splash = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return (
    <div className={classes.splash}>
      <h1>The onboarding assistant that does your dirty work.</h1>
      <h2>Coming Soon.</h2>
      <h3>A <a className="pill" href="https://gun.io">Gun.io</a> Production</h3>
    </div>
  )
  else return (
    <div className={classes.splash}>
      <h1>Let's get started.</h1>
    </div>
  )

};

export default Splash;
