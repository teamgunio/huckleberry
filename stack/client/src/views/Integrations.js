import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useAuth0 } from "../contexts/auth0";

import EmptyList from '../components/EmptyList';
import NewIntegration from '../components/NewIntegration';

const { REACT_APP_API_BASE } = process.env;

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
    >New Integration</Button>
  )
}

const Integration = props => {
  const classes = useStyles();

  const { name, workspace, repository, createdAt } = props

  return (
    <div className={classes.item} title={`${name} Integration Added ${createdAt.toLocaleString()}`}>
      <div>
        Service: {name}
        { repository && `Repository: ${repository}` }
        { workspace && `Workspace: ${workspace}` }
      </div>
      <Button>Reauthorize</Button>
      <Button color="secondary">Remove</Button>
    </div>
  )
}

const Integrations = () => {
  const classes = useStyles();
  const {
    accessToken,
  } = useAuth0();

  const [newIntegration, setNewIntegration] = useState(false);
  const [integrations, setIntegrations] = useState([
    // {
    //   id: 1,
    //   type: 'github',
    //   createdAt: new Date(),
    //   name: 'GitHub',
    //   user: {
    //     id: 1,
    //     username: 'dgraham',
    //     firstName: 'Danny',
    //     lastName: 'Graham',
    //   }
    // },
  ])

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

  const saveIntegration = async (integration) => {
    const uri = integration.id ? `${REACT_APP_API_BASE}/integrations/:${integration.id}` : `${REACT_APP_API_BASE}/integrations`
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

  return (
    <div className={classes.root}>
      { newIntegration === false &&
        <div className={classes.list}>
          { integrations.length > 0 && 
            <Fragment>
              {integrations.map(integration => (
                <Integration {...integration} key={integration.id} />
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
    </div>
  );
};

export default Integrations;
