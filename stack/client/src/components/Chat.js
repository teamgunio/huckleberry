import React, { Fragment, useEffect, useState, useRef } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import { useSocket } from '../contexts/socket';
import { useAuth0 } from '../contexts/auth0';
import { useApp } from '../contexts/app';

import { handleMessage } from '../services/workflow.js';
import { get } from '../services/api.js';

import Doc from '../doc.jpg';

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
    padding: theme.spacing(1),
  },
  messages: {
    height: 0,
    overflowY: 'scroll',
    flexGrow: 1,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
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
  const { fetchActivities } = useApp();
  const [messages, setMessages] = useState([{
    avatar: null,
    from: `Doc`,
    user: `Doc`,
    body: `Hey, what's up`,
    timestamp: (new Date()).toLocaleString(),
  }]);

  useEffect(() => {
    const loadHistory = async () => {
      const res = await get('messages');
      const messages = await res.json();
      if (messages.length) setMessages(messages)
    }

    if (user) loadHistory();

  }, [user]);

  useEffect(() => {
    const onMessage = async (message) => {
      setMessages([
        ...messages,
        message
      ]);

      await handleMessage(message);
      await fetchActivities();
    }

    if (socket) socket.on('messages', onMessage);

    return function cleanup() {
      if (socket) socket.removeListener('messages', onMessage);
    }
  }, [socket, messages, fetchActivities]);

  const sendMessage = (event) => {
    const body = event.target.value
    const message = {
      to: `Doc`,
      from: user.sub,
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

const scrollTop = ({element}) => {
  element.current.scrollIntoView({ behavior: 'smooth' })
}

const ChatMessages = props => {
  const classes = useStyles();
  const { messages } = props;

  const emRef = useRef(null)
  useEffect(() => scrollTop({element: emRef}), [messages])

  return (
    <Fragment>
      <div className={classes.header}>
        <Typography variant="h6">Talk to the Doc</Typography>
      </div>
      <div id="chatMessages" className={classes.messages}>
        {messages.map((message, i) => (
          <ChatMessage key={`msg-${i}`} message={message} />
        ))}
        <div ref={emRef}></div>
      </div>
    </Fragment>
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
          <Avatar src={Doc} className={classes.avatar} />
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
    <ChatContainer />
  );
};

export default Chat;
