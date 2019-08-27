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

const Integrations = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    integrations: [],
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
              <div>{integration.name}</div>
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
