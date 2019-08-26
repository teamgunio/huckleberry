import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    margin: 'auto',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    justifyContent: 'space-around',
  },
}));

const EmptyList = props => {
  const classes = useStyles();
  const { onClick, title, body } = props

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
      <div className={classes.label}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{body}</Typography>
      </div>
    </div>
  );
};

export default EmptyList;
