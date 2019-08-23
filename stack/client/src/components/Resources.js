import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    borderBottom: '1px solid #ccc',
    '&:last-child': {
      borderBottom: 0,
    }
  }
}));

const Resources = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <h3>Integrations</h3>
      </div>
      <div className={classes.section}>
        <h3>Workflows</h3>
      </div>
      <div className={classes.section}>
        <h3>Clients</h3>
      </div>
      <div className={classes.section}>
        <h3>Users</h3>
      </div>
    </div>
  );
};

export default Resources;
