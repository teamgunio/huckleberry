import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';
import { EventsService } from './events.service';

export interface Message {
  [body: string]: string;
  user: string;
  avatar: string | undefined;
  timestamp: string;
}

@WebSocketGateway({ namespace: 'api/rtm/events', path: '/api/rtm' })
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('messages')
  async latestMessages(client: Client, data: any) {
    const reply = await this.eventsService.detectIntent(data.body);
    const msg:Message = {
      body: reply,
      user: 'Doc',
      avatar: null,
      timestamp: (new Date()).toLocaleString(),
    };
    return from([msg]).pipe(map(item => ({ event: 'messages', data: item })));
  }

  @SubscribeMessage('events')
  findAll(client: Client, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    return data;
  }
}
