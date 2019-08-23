import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'block',
    color: '#ccc',
    position: 'absolute',
    width: '100%',
    height: '6px',
  },
  bar: {
    content: "",
    display: 'inline',
    position: 'absolute',
    width: 0,
    height: '100%',
    left: '50%',
    textAlign: 'center',
    '&:nth-child(1)': {
      backgroundColor: '#da4733',
      animation: 'loading 3s linear infinite',
    },
    '&:nth-child(2)': {
      backgroundColor: '#68E4AA',
      animation: 'loading 3s linear infinite',
    },
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
    </div>
  );
};

export default Loading;
