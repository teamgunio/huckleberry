import React, { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { SocketProvider, useSocket } from '../contexts/socket';

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
  header: {
    borderBottom: '1px solid #eaeaea',
    marginBottom: theme.spacing(1),
  },
  messages: {
    flex: 1,
    padding: theme.spacing(1),
  },
  avatar: {
    float: 'left',
    marginRight: theme.spacing(1),
  },
  user: {
    float: 'left',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  timestamp: {
    fontSize: '.8em',
    lineHeight: '1.5em',
  },
  chat: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  input: {
    flex: 1,
  }
}));

const ChatMessages = () => {
  const classes = useStyles();
  const { socket } = useSocket();
  
  useEffect(() => {
    if (socket) {
      socket.on('messages', res => console.log('message', res));
    }
  }, [socket])

  return (
    <div className={classes.messages}>
      <div className={classes.header}>
        <Typography variant="h6">Talk to the Doc</Typography>
      </div>
      <ChatMessage />
    </div>
  )
}

const ChatMessage = () => {
  const classes = useStyles();

  return (
    <div className={classes.message}>
      <div className={classes.avatar}><AccountCircle /></div>
      <div className={classes.user}>Doc</div>
      <div className={classes.timestamp}>08:00 PST</div>
      <div className={classes.body}>Hey what's up</div>
    </div>
  )
}

const ChatInput = () => {
  const classes = useStyles();
  const { socket } = useSocket();

  const sendMessage = (event) => {
    const body = event.target.value
    socket.emit('messages', { body });
  }

  return (
    <div className={classes.chat}>
      <TextField
        className={classes.input}
        margin="dense"
        variant="outlined"
        placeholder="Chat"
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            sendMessage(ev);
            ev.preventDefault();
          }
        }}
      />
    </div>
  )
}

const Chat = () => {
  const classes = useStyles();

  return (
    <SocketProvider>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <ChatMessages />
          <ChatInput />
        </Paper>
      </div>
    </SocketProvider>
  );
};

export default Chat;
