import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useAuth0 } from "../contexts/auth0";
import { startOAuthFlow, useOAuth } from '../contexts/oauth';

import EmptyList from '../components/EmptyList';
import NewIntegration from '../components/NewIntegration';

import SimpleIcon from '../components/SimpleIcon';
import GitHubIcon from 'simple-icons/icons/github';

const {
  REACT_APP_API_BASE,
} = process.env;

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    '& div:first-child': {
      flex: 1,
    }
  },
  item: {
    display: 'flex',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NewIntegrationButton = props => {
  const { onClick } = props;
  return (
    <Button
      color="primary"
      onClick={onClick}
    >Add Integration</Button>
  )
}

const Integration = props => {
  const classes = useStyles();
  const {
    integration,
  } = props;

  const {
    type,
    name,
    createdAt,
  } = integration;

  const authorize = () => {
    startOAuthFlow(type, integration);
  }

  return (
    <div className={classes.item} title={`${name} Integration Added ${createdAt.toLocaleString()}`}>
      <div className={classes.itemInfo}>
        {type === 'github' &&
          <Fragment>
            <SimpleIcon path={GitHubIcon.path} size={24} className={classes.icon}/>
            GitHub
          </Fragment>
        }
        {type !== 'github' && name }
      </div>
      <Button onClick={authorize}>Reauthorize</Button>
      <Button color="secondary">Remove</Button>
    </div>
  )
}

const Integrations = () => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = React.useState(false);

  const {
    accessToken,
  } = useAuth0();

  const {
    code,
    pendingIntegration,
    setPendingIntegration,
  } = useOAuth();

  const [newIntegration, setNewIntegration] = useState(false);
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${REACT_APP_API_BASE}/integrations`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      const integrations = await res.json()
      setIntegrations(integrations)
    }
    if (accessToken) fetchData();
  }, [accessToken])

  useEffect(() => {
    const onAuthorized = async (integration) => {
      const uri = `${REACT_APP_API_BASE}/integrations/${integration.id}/authorize`
      await fetch(uri, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code })
      })
      setPendingIntegration(null);
      setSnackbar(true);
    }
    if (pendingIntegration && accessToken) onAuthorized(pendingIntegration);
  }, [accessToken, pendingIntegration, setPendingIntegration, code])

  const saveIntegration = async (integration) => {
    const uri = integration.id ? `${REACT_APP_API_BASE}/integrations/${integration.id}` : `${REACT_APP_API_BASE}/integrations`
    await fetch(uri, {
      method: integration.id ? 'Put' : 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({integration})
    })
    setNewIntegration(false)
  }

  const addIntegration = () => {
    setNewIntegration(true)
  }

  const cancelAddIntegration = () => {
    setNewIntegration(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  }

  return (
    <div className={classes.root}>
      { newIntegration === false &&
        <div className={classes.list}>
          { integrations.length > 0 && 
            <Fragment>
              {integrations.map(integration => (
                <Integration integration={integration} key={integration.id} />
              ))}
              <NewIntegrationButton onClick={addIntegration}/>
            </Fragment>
          }
          { integrations.length === 0 && 
            <EmptyList
              title="Add an Integration"
              body="Get started with your first integration"
              onClick={addIntegration}
            />
          }
        </div>
      }
      { newIntegration === true && 
        <div className={classes.form}>
          <NewIntegration onCancel={cancelAddIntegration} onSave={saveIntegration}/>
        </div>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Integration Authorized</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default Integrations;
