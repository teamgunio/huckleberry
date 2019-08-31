import history from '../history';
import { startOAuthFlow } from '../contexts/oauth';
import { post, get } from './api';

const flows = {
  addIntegration: async (params) => {
    const { service } = params;
    const type = service.stringValue.toLowerCase();
    let integration = {
      type,
    };

    const res = await post('integrations', {
      body: JSON.stringify({integration})
    });

    integration = await res.json();

    setTimeout(() => {
      startOAuthFlow(type, integration);
    }, 3000);
  },
};

export const handleMessage = async message => {
  const { action, parameters } = message;
  if (flows[action]) return flows[action](parameters.fields);
  else {
    let res = await get('skills');
    const skills = await res.json();
    const [skill] = skills.filter(s => s.action === action);

    if (skill) {
      await post(`skills/${skill.id}/run`);
      history.push('/activities');
    }
  }
};
