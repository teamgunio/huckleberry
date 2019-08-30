import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

// import { useOAuth } from '../contexts/oauth';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    marginTop: theme.spacing(1)
  }
}));

const NewIntegration = props => {
  const classes = useStyles();

  const { onCancel, onSave } = props;

  const [values, setValues] = React.useState({
    type: '',
    workspace: '',
    repository: '',
  });

  const handleChange = (event) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTextChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">Setup a New Integration</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="type-simple">Type</InputLabel>
        <Select
          value={values.type}
          onChange={handleChange}
          inputProps={{
            name: 'type',
            id: 'type-simple',
          }}
          margin="dense"
        >
          <MenuItem value="slack">Slack</MenuItem>
          <MenuItem value="jira">JIRA</MenuItem>
          <MenuItem value="github">GitHub</MenuItem>
        </Select>
      </FormControl>
      { values.type !== '' &&
        <FormControl className={classes.formControl}>
          { (values.type === 'slack' || values.type === 'jira') &&
            <TextField
              onChange={handleTextChange('workspace')}
              id="workspace"
              label="Workspace"
              placeholder="Workspace URL"
              margin="normal"
            />
          }
          { (values.type === 'github') &&
            <TextField
              onChange={handleTextChange('repository')}
              id="repository"
              label="Repository"
              placeholder="Repository URL"
              margin="normal"
            />
          }
        </FormControl>
      }
      <div className={classes.buttons}>
        <Button
          color="primary"
          disabled={values.type === ''}
          onClick={() => onSave(values)}
        >Authorize</Button>
        <Button
          color="primary"
          onClick={onCancel}
        >Cancel</Button>
      </div>
    </div>
  );
};

export default NewIntegration;
