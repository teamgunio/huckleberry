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

  async detectIntent(query: string): Promise<string> {
    const projectId = 'gunio-tools';
    const sessionId = 'asdflajksdflkasjdflkajsdfl';
    const languageCode = 'en';
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
    const { fulfillmentText } = response.queryResult;
    return fulfillmentText;
  }
}
