import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import EmptyList from '../components/EmptyList';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Integrations = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EmptyList
        title="Add an Integration"
        body="Get started with your first integration"
      />
    </div>
  );
};

export default Integrations;
