import React from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  messages: {
    flex: 1,
    padding: theme.spacing(1),
  },
  chat: {
    border: '2px solid #ccc',
    borderRadius: '5px',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  }
}));

const Chat = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.messages}>
          <div className={classes.message}>
            <div className={classes.avatar}>[]</div>
            <div className={classes.timestamp}>08:00 PST</div>
            <div className={classes.body}>Hey what's up</div>
          </div>
        </div>
        <div className={classes.chat}>
          <div className={classes.input}>Chat</div>
        </div>
      </Paper>
    </div>
  );
};

export default Chat;
