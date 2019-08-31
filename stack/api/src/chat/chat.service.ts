import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import dialogflow from 'dialogflow';
import { Message, iMessage } from './message.entity';

const sessionClient = new dialogflow.SessionsClient();
const projectId = 'gunio-tools';
const sessionId = 'asdflajksdflkasjdflkajsdfl';
const languageCode = 'en';

const rand = (min, max) => {
  return Math.random() * (max - min) + min;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  private storeMessage(message: iMessage) {
    console.log('storing message');
  }

  async handleMessage(message: any): Promise<iMessage> {
    await this.storeMessage(message);
    const metadata = await this.detectIntent(message.body);
    const reply:iMessage = this.buildMessage(metadata);
    await this.storeMessage(reply);
    return reply;
  }

  async detectIntent(query: string): Promise<any> {

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

  buildMessage(metadata: any): iMessage {
    const {
      fulfillmentText,
      action,
      parameters,
      error,
    } = metadata;

    const message:iMessage = {
      body: fulfillmentText,
      user: 'Doc',
      avatar: null,
      action,
      parameters,
      error,
      metadata,
      timestamp: (new Date()).toLocaleString(),
    };

    return message;
  }

  async findAll(): Promise<iMessage[]> {
    return (await this.messageRepository.find()).map(msg => {
      const message:iMessage = {
        ...msg.payload
      };
      return message;
    });
  }
}
