import { Controller, Get, Put, Post, Delete, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message, iMessage } from './message.entity';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/api/messages')
  async fetch(): Promise<iMessage[]> {
    return this.chatService.findAll();
  }
}
