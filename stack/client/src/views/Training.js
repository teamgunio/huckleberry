import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useAuth0 } from "../contexts/auth0";
import { get, del } from '../services/api';

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
      <Button onClick={() => onDeleteSkill(id)} color="secondary">Remove</Button>
    </div>
  )
}

const Training = () => {
  const classes = useStyles();

  const {
    isAuthenticated,
  } = useAuth0();

  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    const res = await get('skills');
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      const skills = await getSkills();
      setSkills(skills);
    }
    if (isAuthenticated) fetchData();
  }, [isAuthenticated])

  // const saveSkill = async (skill) => {
  //   await post(`skills`, {
  //     body: JSON.stringify({skill})
  //   });

  //   const skills = await getSkills();
  //   setSkills(skills);
  // }

  const onDeleteSkill = async (id) => {
    await del(`skills/${id}`);
    const skills = await getSkills();
    setSkills(skills);
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {skills.length && skills.map(skill => (
          <Skill
            key={skill.id}
            skill={skill}
            onDelete={onDeleteSkill}
          />
        ))}
        <NewSkillButton
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Training;
