import React, { useState, useEffect } from "react";
import history from '../history';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useApp } from "../contexts/app";
import { useAuth0 } from "../contexts/auth0";
import { get, del, post } from '../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    textAlign: 'end',
    '& div:first-child': {
      flex: 1,
    }
  },
  addBtn: {
    marginTop: theme.spacing(1),
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

const NewSkillButton = props => {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={onClick}
      className={classes.addBtn}
    >New Skill</Button>
  )
}

const Skill = props => {
  const classes = useStyles();
  const {
    skill,
    onRunSkill,
    onEditSkill,
    onDeleteSkill,
  } = props;

  const {
    id,
    name,
    createdAt,
  } = skill;

  return (
    <div className={classes.item} title={`${name} Skill Added ${createdAt.toLocaleString()}`}>
      <div className={classes.itemInfo}>{name}</div>
      <Button onClick={() => onRunSkill(skill)} color="primary">Run</Button>
      <Button onClick={() => onEditSkill(id)} color="primary">Edit</Button>
      <Button onClick={() => onDeleteSkill(id)} color="secondary">Remove</Button>
    </div>
  )
}

const Training = () => {
  const classes = useStyles();

  const {
    isAuthenticated,
  } = useAuth0();

  const {
    fetchActivities,
    setPending,
  } = useApp();

  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    const res = await get('skills');
    return (await res.json()).filter(s => s.state !== 'learned');
  }

  useEffect(() => {
    const fetchData = async () => {
      const skills = await getSkills();
      setSkills(skills);
    }
    if (isAuthenticated) fetchData();
  }, [isAuthenticated])

  const saveSkill = async (skill) => {
    await post(`skills`, {
      body: JSON.stringify({skill})
    });

    const skills = await getSkills();
    setSkills(skills);
  }

  const onDeleteSkill = async (id) => {
    await del(`skills/${id}`);
    const skills = await getSkills();
    setSkills(skills);
  }

  const onEditSkill = (id) => {
    history.push(`/skills/${id}`)
  }

  const onRunSkill = async (skill) => {
    history.push('/activities');
    setPending(oldValues => ([
      ...oldValues,
      {
        skill,
        startedAt: Date.now(),
        payload: {
          stdout: '',
          stderr: '',
        },
      },
    ]));
    await post(`skills/${skill.id}/run`);
    await fetchActivities();
    setPending([]);
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {(skills.length > 0) && skills.map(skill => (
          <Skill
            key={skill.id}
            skill={skill}
            onRunSkill={onRunSkill}
            onEditSkill={onEditSkill}
            onDeleteSkill={onDeleteSkill}
          />
        ))}
        <NewSkillButton
          onClick={() => {
            history.push('/skills/new');
          }}
          onReturn={saveSkill}
        />
      </div>
    </div>
  );
};

export default Training;
