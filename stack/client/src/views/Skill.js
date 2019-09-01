import React, { useEffect, useState } from "react";
import history from '../history';

import { get, post, put } from '../services/api';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';

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
  addBtn: {
    cursor: 'pointer',
  },
  columns: {
    display: 'flex',
  },
  fieldset: {
    marginBottom: theme.spacing(2),
    '& > div': {
      marginRight: theme.spacing(2),
    },
  },
  multiValue: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  code: {
    '& textarea': {
      fontSize: 12,
      // fontSize: 16,
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'monospace',
      ].join(','),
    }
  },
}));

const MultiValue = props => {
  const classes = useStyles();

  return (
    <div className={classes.multiValue}>
      <div>{props.value}</div>
      <IconButton size="small" onClick={props.onDelete}>
        <Delete/>
      </IconButton>
    </div>
  )
};

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
    messages: [],
    state: 'training',
    trainingPhrases: [],
  });

  const showProvider = false;

  const onSave = async () => {
    const skill = values;
    const options = { body: JSON.stringify({skill}) };

    if (isNew) await post('skills', options);
    else if (!isNew && skill.id) await put(`skills/${skill.id}`, options);

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

  const handleMultivalueChange = name => event => {
    if (values[name].includes(event.target.value)) return;
    setValues(oldValues => ({
       ...oldValues,
      [name]: [
        ...oldValues[name],
        event.target.value
      ],
    }));
  };

  const handleMultivalueDelete = name => event => {
    setValues(oldValues => ({
       ...oldValues,
      [name]: oldValues[name].filter(i => (i !== event.target.value))
    }));
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await get(`skills/${id}`);
      const skill = await res.json();

      const trainingPhrases = skill.trainingPhrases || [];
      const messages = skill.messages || [];

      if (skill) setValues(oldValues => ({
        ...oldValues,
        ...skill,
        trainingPhrases,
        messages,
      }));
    }
    if (/new$/.test(window.location.pathname)) {
      setIsNew(true);
    } else {
      const [match, id] = window.location.pathname.match(/skills\/(.*)$/);
      fetchData(id, match);
    }
  },[])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5">{ isNew === true && 'New ' }Skill</Typography>

        <div className={classes.form}>
          <div className={classes.columns}>
            <div className={classes.column}>
              <div className={classes.fieldset}>
                <FormControl className={classes.formControl}>
                  <TextField
                    onChange={handleTextChange('name')}
                    id="name"
                    label="Name"
                    value={values.name}
                    placeholder="Login to JIRA"
                    margin="normal"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    onChange={handleTextChange('action')}
                    id="action"
                    label="Action"
                    value={values.action}
                    placeholder="adIntegration or add-user-to-github-repository"
                    margin="normal"
                  />
                </FormControl>
              </div>
              <div className={classes.fieldset}>
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
                  <InputLabel htmlFor="state-simple">State</InputLabel>
                  <Select
                    value={values.state}
                    onChange={handleChange}
                    inputProps={{
                      name: 'state',
                      id: 'state-simple',
                    }}
                    margin="dense"
                  >
                    <MenuItem value="training">Training</MenuItem>
                    <MenuItem value="learned">Learned</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldset}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="trainingPhrases"
                    label="Training Phrases"
                    placeholder="Go to google and take a screenshot"
                    margin="normal"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        handleMultivalueChange('trainingPhrases')(ev);
                        ev.target.value = '';
                        ev.preventDefault();
                      }
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><AddBox className={classes.addBtn} onClick={(ev) => {
                        const value = document.getElementById('trainingPhrases').value;
                        handleMultivalueChange('trainingPhrases')({ target: { value }});
                        document.getElementById('trainingPhrases').value = '';
                      }}/></InputAdornment>,
                    }}
                  />
                  {values.trainingPhrases.map(p => (
                    <MultiValue
                      key={p}
                      value={p}
                      onDelete={() => {
                        handleMultivalueDelete('trainingPhrases')({
                          target: { value: p }
                        });
                      }}
                    />
                  ))}
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="messages"
                    label="Response Messages"
                    placeholder="Okay, hombre"
                    margin="normal"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        handleMultivalueChange('messages')(ev);
                        ev.target.value = '';
                        ev.preventDefault();
                      }
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><AddBox className={classes.addBtn} onClick={(ev) => {
                        const value = document.getElementById('messages').value;
                        handleMultivalueChange('messages')({ target: { value }});
                        document.getElementById('messages').value = '';
                      }}/></InputAdornment>,
                    }}
                  />
                  {values.messages.map(p => (
                    <MultiValue
                      key={p}
                      value={p}
                      onDelete={() => {
                        handleMultivalueDelete('messages')({
                          target: { value: p }
                        });
                      }}
                    />
                  ))}
                </FormControl>
              </div>
            </div>
          </div>
          { showProvider === true && 
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
          }
          { values.provider === 'tagui' &&
            <FormControl className={classes.formControl}>
              <TextField
                onChange={handleTextChange('template')}
                id="template"
                label="TagUI Instructions"
                value={values.template}
                placeholder={`https://www.typeform.com
click login
type username as user@gmail.com
type password as 12345678
click btnlogin
download https://admin.typeform.com/xxx to report.csv`}
                className={classes.code}
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
