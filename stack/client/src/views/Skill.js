import React, { useEffect, useState } from "react";
import history from '../history';

import { post } from '../services/api';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    marginTop: theme.spacing(1),
    textAlign: 'end',
    '& > button': {
      marginLeft: theme.spacing(1),
    }
  },
  code: {
    fontSize: 12,
    // fontSize: 16,
    // Use the system font instead of the default Roboto font.
    // fontFamily: [
    //   'monospace',
    // ].join(','),
  },
}));

const Skill = props => {
  const classes = useStyles();
  const [isNew, setIsNew] = useState(false);

  const [values, setValues] = useState({
    name: '',
    type: 'action',
    action: '',
    params: {},
    provider: 'tagui',
    template: '',
  });

  const onSave = async () => {
    const skill = values;
    await post('skills', {
      body: JSON.stringify({skill})
    });
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };

  const handleChange = (event) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTextChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    if (/new$/.test(window.location.pathname)) {
      setIsNew(true);
    }
  },[])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5">{ isNew === true && 'New ' }Skill</Typography>

        <div className={classes.form}>
          <FormControl className={classes.formControl}>
            <TextField
              onChange={handleTextChange('name')}
              id="name"
              label="Name"
              placeholder="Login to JIRA"
              margin="normal"
            />
          </FormControl>
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
              <MenuItem value="action">Action</MenuItem>
              <MenuItem value="process">Process</MenuItem>
              <MenuItem value="workflow">Workflow</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              onChange={handleTextChange('action')}
              id="action"
              label="Action"
              placeholder="adIntegration or add-user-to-github-repository"
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="provider-simple">Provider</InputLabel>
            <Select
              value={values.provider}
              onChange={handleChange}
              inputProps={{
                name: 'provider',
                id: 'provider-simple',
              }}
              margin="dense"
            >
              <MenuItem value="tagui">TagUI</MenuItem>
            </Select>
          </FormControl>
          { values.provider === 'tagui' &&
            <FormControl className={classes.formControl}>
              <TextField
                onChange={handleTextChange('template')}
                id="template"
                label="TagUI Instructions Template"
                placeholder={`https://www.typeform.com
click login
type username as user@gmail.com
type password as 12345678
click btnlogin
download https://admin.typeform.com/xxx to report.csv`}
                margin="normal"
                multiline
              />
            </FormControl>
          }
        </div>

        <div className={classes.buttons}>
          <Button
            color="primary"
            variant="contained"
            disabled={values.type === '' || values.name === ''}
            onClick={() => onSave(values)}
          >Save</Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={onCancel}
          >Cancel</Button>
        </div>
      </Paper>
    </div>
  );
};

export default Skill;
