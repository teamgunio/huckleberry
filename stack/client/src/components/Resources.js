import React, { useEffect, useState } from "react";
import history from '../history';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Integrations from '../views/Integrations';
import Training from '../views/Training';
import Skills from '../views/Skills';
import Activities from '../views/Activities';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  panels: {
    margin: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

let unlisten;
const paths = ['activities', 'skills', 'training', 'integrations'];

const Resources = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState('activities');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    history.push(`/${panel}`);
  };

  const handlePathChange = pathname => {
    const path = pathname.substr(1);
    if (paths.includes(path)) setExpanded(path);
  }

  useEffect(() => {
    handlePathChange(window.location.pathname);
  },[]);

  useEffect(() => {
    unlisten = history.listen((location, action) => {
      handlePathChange(location.pathname);
    })
    return function cleanup() {
      unlisten();
    }
  },[]);

  return (
    <div className={classes.root}>
      <div className={classes.panels}>
        <ExpansionPanel expanded={expanded === 'activities'} onChange={handleChange('activities')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="clientsbh-content"
            id="clientsbh-header"
          >
            <Typography className={classes.heading}>Activities</Typography>
            <Typography className={classes.secondaryHeading}>
              What I've been up to
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Activities />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'skills'} onChange={handleChange('skills')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="workflowsbh-content"
            id="workflowsbh-header"
          >
            <Typography className={classes.heading}>Skills</Typography>
            <Typography className={classes.secondaryHeading}>
              Things I know how to do
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Skills />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'training'} onChange={handleChange('training')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="usersbh-content"
            id="usersbh-header"
          >
            <Typography className={classes.heading}>Training</Typography>
            <Typography className={classes.secondaryHeading}>
              Things I'm learning how to do
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Training />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'integrations'} onChange={handleChange('integrations')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="integrationsbh-content"
            id="integrationsbh-header"
          >
            <Typography className={classes.heading}>Integrations</Typography>
            <Typography className={classes.secondaryHeading}>
              External systems I'm connected to
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Integrations/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};

export default Resources;
