import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { SocketProvider, useSocket } from '../contexts/socket';
import { useAuth0 } from '../contexts/auth0';

import { handleMessage } from '../services/workflow.js';

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
  message: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    float: 'left',
    marginRight: theme.spacing(1),
    width: '40px',
    height: '40px',
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

const ChatContainer = () => {
  const classes = useStyles();
  const { socket } = useSocket();
  const { user } = useAuth0();
  const [messages, setMessages] = useState([{
    avatar: null,
    user: `Doc`,
    body: `Hey, what's up`,
    timestamp: (new Date()).toLocaleString(),
  }]);
  
  useEffect(() => {
    const onMessage = async (message) => {
      handleMessage(message);
      setMessages([
        ...messages,
        message
      ]);
    }

    if (socket) socket.on('messages', onMessage);

    return function cleanup() {
      if (socket) socket.removeListener('messages', onMessage);
    }
  }, [socket, messages]);

  const sendMessage = (event) => {
    const body = event.target.value
    const message = {
      user: user.name,
      avatar: user.picture,
      body,
      timestamp: (new Date()).toLocaleString(),
    }
    socket.emit('messages', message);
    setMessages([
      ...messages,
      message,
    ]);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ChatMessages messages={messages}/>
        <ChatInput onSend={sendMessage}/>
      </Paper>
    </div>
  )
}

const ChatMessages = props => {
  const classes = useStyles();
  const { messages } = props;

  return (
    <div className={classes.messages}>
      <div className={classes.header}>
        <Typography variant="h6">Talk to the Doc</Typography>
      </div>
      {messages.map((message, i) => (
        <ChatMessage key={`msg-${i}`} message={message} />
      ))}
    </div>
  )
}

const ChatMessage = props => {
  const classes = useStyles();
  const {
    avatar,
    user,
    body,
    timestamp,
  } = props.message

  return (
    <div className={classes.message}>
      <div>
        { (avatar) ?
          <Avatar src={avatar} className={classes.avatar} />
          :
          <AccountCircle className={classes.avatar} />
        }
      </div>
      <div className={classes.user}>{user}</div>
      <div className={classes.timestamp}>{timestamp}</div>
      <div className={classes.body}>{body}</div>
    </div>
  )
}

const ChatInput = props => {
  const classes = useStyles();
  const { onSend } = props;

  return (
    <div className={classes.chat}>
      <TextField
        className={classes.input}
        margin="dense"
        variant="outlined"
        placeholder="Chat"
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            onSend(ev);
            ev.target.value = '';
            ev.preventDefault();
          }
        }}
      />
    </div>
  )
}

const Chat = () => {
  return (
    <SocketProvider>
      <ChatContainer />
    </SocketProvider>
  );
};

export default Chat;
