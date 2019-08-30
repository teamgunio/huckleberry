import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Integrations from '../views/Integrations';

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

const Resources = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState('integrations');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.panels}>
        <ExpansionPanel expanded={expanded === 'integrations'} onChange={handleChange('integrations')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="integrationsbh-content"
            id="integrationsbh-header"
          >
            <Typography className={classes.heading}>Integrations</Typography>
            <Typography className={classes.secondaryHeading}>
              Authorize connections to external systems
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Integrations/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'workflows'} onChange={handleChange('workflows')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="workflowsbh-content"
            id="workflowsbh-header"
          >
            <Typography className={classes.heading}>Workflows</Typography>
            <Typography className={classes.secondaryHeading}>
              Define automation workflows
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Add a workflow
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'clients'} onChange={handleChange('clients')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="clientsbh-content"
            id="clientsbh-header"
          >
            <Typography className={classes.heading}>Clients</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'users'} onChange={handleChange('users')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="usersbh-content"
            id="usersbh-header"
          >
            <Typography className={classes.heading}>Users</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};

export default Resources;
