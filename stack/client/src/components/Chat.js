import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    flex: 1,
    margin: theme.spacing(1),
    border: '2px solid #ccc',
    borderRadius: '5px',
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
    </div>
  );
};

export default Chat;
