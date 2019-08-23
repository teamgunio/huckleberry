import React from "react";
import { makeStyles } from '@material-ui/core/styles';


import Chat from '../components/Chat';
import Resources from '../components/Resources';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chat />
      <Resources />
    </div>
  );
};

export default Dashboard;
