import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import EmptyList from '../components/EmptyList';
import NewIntegration from '../components/NewIntegration';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Integration = props => {
  const classes = useStyles();

  const { name, createdAt } = props

  return (
    <div className={classes.item}>
      <div>{name}</div>
      <div>{createdAt.toLocaleString()}</div>
      <button>Reauthorize</button>
      <button>Remove</button>
    </div>
  )
}

const Integrations = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    integrations: [{
      id: 1,
      type: 'github',
      createdAt: new Date(),
      name: 'GitHub',
      user: {
        id: 1,
        username: 'dgraham',
        firstName: 'Danny',
        lastName: 'Graham',
      }
    }],
    newIntegration: false,
  });

  const addIntegration = () => {
    setValues({
      ...values,
      newIntegration: true
    })
  }

  const cancelAddIntegration = () => {
    setValues({
      ...values,
      newIntegration: false
    })
  }

  return (
    <div className={classes.root}>
      { values.newIntegration === false &&
        <div className={classes.list}>
          { values.integrations.length > 0 && 
            values.integrations.map(integration => (
              <Integration {...integration} key={integration.id} />
            ))
          }
          { values.integrations.length === 0 && 
            <EmptyList
              title="Add an Integration"
              body="Get started with your first integration"
              onClick={addIntegration}
            />
          }
        </div>
      }
      { values.newIntegration === true && 
        <div className={classes.form}>
          <NewIntegration onCancel={cancelAddIntegration} />
        </div>
      }
    </div>
  );
};

export default Integrations;
