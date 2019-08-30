import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import dialogflow from 'dialogflow';

const sessionClient = new dialogflow.SessionsClient();
const rand = (min, max) => {
  return Math.random() * (max - min) + min;
}

@Injectable()
export class EventsService {
  constructor(
  ) {}

  async detectIntent(query: string): Promise<any> {
    const projectId = 'gunio-tools';
    const sessionId = 'asdflajksdflkasjdflkajsdfl';
    const languageCode = 'en';

    try {
      const sessionPath = sessionClient.sessionPath(projectId, sessionId);
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: languageCode,
          },
        },
      };
      const [response] = await sessionClient.detectIntent(request);
      return response.queryResult;
    } catch (error) {
      console.log(error);
      return {
        fulfillmentText: `Y'know, I'm gonna have to get back to you - I'm having issues.`,
        error,
      };
    }
  }
}
