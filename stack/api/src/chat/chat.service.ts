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

  private async storeMessage(message: iMessage): Promise<void> {
    const msg = new Message();
    msg.to = message.to;
    msg.from = message.from;
    msg.payload = message;
    msg.timestamp = new Date(message.timestamp);
    await this.messageRepository.save(msg);
  }

  async handleMessage(message: any): Promise<iMessage> {
    await this.storeMessage(message);
    const metadata = await this.detectIntent(message.body);
    const reply:iMessage = this.buildMessage(message.from, metadata);
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

  buildMessage(to: string, metadata: any): iMessage {
    const {
      action,
      parameters,
      fulfillmentText,
      error,
    } = metadata;

    const message:iMessage = {
      to,
      from: 'Doc',
      user: 'Doc',
      avatar: null,
      action,
      parameters,
      metadata,
      body: fulfillmentText,
      timestamp: (new Date()).toLocaleString(),
      error,
    };

    return message;
  }

  async findAll(user: string): Promise<iMessage[]> {
    const messages = await this.messageRepository
      .query(`
        SELECT *
        FROM message
        WHERE "to" = '${user.sub}'
          OR "from" = '${user.sub}'
        LIMIT 50;
      `);
    return messages.map(msg => {
      const message:iMessage = {
        ...msg.payload
      };
      return message;
    });
  }
}
