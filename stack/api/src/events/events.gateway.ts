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
import { ChatService } from '../chat/chat.service';
import { iMessage } from '../chat/message.entity';

@WebSocketGateway({ namespace: 'api/rtm/events', path: '/api/rtm' })
export class EventsGateway {
  constructor(
    private readonly eventsService: EventsService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('messages')
  async latestMessages(client: Client, data: any) {
    const reply:iMessage = await this.chatService.handleMessage(data)
    return from([reply]).pipe(map(item => ({ event: 'messages', data: item })));
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
