import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import TimeAgo from 'react-timeago'

import { useApp } from '../contexts/app';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    maxHeight: '20em',
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #eaeaea',
    '&:last-child': {
      borderBottom: 0,
    },
  },
  itemInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eaeaea',
    },
  },
  open: {
    height: '1em',
    '& > svg': {
      height: '.8em',
    },
  },
  status: {
    height: '1em',
    '& > svg': {
      height: '.8em',
    },
  },
  name: {
    flex: 1,
    display: 'flex',
  },
  date: {
    fontSize: '0.8em',
    alignItems: 'center',
  },
  details: {
    textAlign: 'left',
    fontSize: '0.8em',
    padding: theme.spacing(1),
    '& > pre': {
      padding: theme.spacing(1),
      backgroundColor: '#eaeaea',
      margin: 0,
    }
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Activity = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const {
    activity,
  } = props;

  const {
    skill,
    payload,
    startedAt,
    completedAt,
  } = activity;

  const took = (
    (new Date(completedAt) - new Date(startedAt)) / 1000
  )

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div className={classes.item}>
      <div className={classes.itemInfo} onClick={handleOpen}>
        <div className={classes.name}>
          <div className={classes.status}>
            { payload.stderr.length === 0 && <CheckCircle color="primary" /> }
            { payload.stderr.length > 0 && <ErrorIcon color="error" /> }
          </div>
          <div>
          {skill.name}
          </div>
        </div>
        <div className={classes.date}>
          <TimeAgo date={completedAt} />
        </div>
        <div className={classes.open}>
        { open === true && <KeyboardArrowDown/> }
        { open === false && <KeyboardArrowRight/> }
        </div>
      </div>
      { open === true &&
        <div className={classes.details}>
          <p>Took {took} seconds</p>
          <pre>
            {payload.stdout.trim()}
            {payload.stderr.trim()}
          </pre>
        </div>
      }
    </div>
  )
}

const Activities = () => {
  const classes = useStyles();

  const {
    activities,
  } = useApp();

  const sorted = [
    ...activities,
  ].reverse();

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {(activities.length > 0) && sorted.map(activity => (
          <Activity
            key={activity.id}
            activity={activity}
          />
        ))}
      </div>
    </div>
  );
};

export default Activities;
